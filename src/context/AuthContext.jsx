import { createContext, useContext, useState, useEffect } from 'react'
import { 
  onAuthStateChangedCustom, 
  registerUser, 
  loginUser, 
  loginWithGoogle,
  logoutUser, 
  getUserData,
  updateUserData,
  enrollInCourse,
  unenrollFromCourse,
  resetPassword,
  isFirebaseConfigured
} from '../services/firebase'
import { sendWelcomeEmail } from '../services/emailjs'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedCustom(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          const data = await getUserData(firebaseUser.uid)
          setUserData(data)
        } catch (err) {
          console.error('Error fetching user data:', err)
          // For demo mode, set basic userData
          setUserData({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            enrolledCourses: firebaseUser.enrolledCourses || []
          })
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const register = async (email, password, displayName) => {
    setError(null)
    try {
      const newUser = await registerUser(email, password, displayName)
      // Try to send welcome email but don't fail if it doesn't work
      try {
        await sendWelcomeEmail(email, displayName)
      } catch (emailError) {
        console.log('Welcome email could not be sent:', emailError)
      }
      return { success: true, user: newUser }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const login = async (email, password) => {
    setError(null)
    try {
      const loggedInUser = await loginUser(email, password)
      return { success: true, user: loggedInUser }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const googleLogin = async () => {
    setError(null)
    try {
      const googleUser = await loginWithGoogle()
      return { success: true, user: googleUser }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const logout = async () => {
    setError(null)
    try {
      await logoutUser()
      setUser(null)
      setUserData(null)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const forgotPassword = async (email) => {
    setError(null)
    try {
      const result = await resetPassword(email)
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const updateProfile = async (data) => {
    setError(null)
    try {
      await updateUserData(user.uid, data)
      const updatedData = await getUserData(user.uid)
      setUserData(updatedData)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const enroll = async (courseId) => {
    if (!user) return { success: false, error: 'Not logged in' }
    try {
      await enrollInCourse(user.uid, courseId)
      const updatedData = await getUserData(user.uid)
      setUserData(updatedData)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const unenroll = async (courseId) => {
    if (!user) return { success: false, error: 'Not logged in' }
    try {
      await unenrollFromCourse(user.uid, courseId)
      const updatedData = await getUserData(user.uid)
      setUserData(updatedData)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const isEnrolled = (courseId) => {
    return userData?.enrolledCourses?.includes(courseId) || false
  }

  const value = {
    user,
    userData,
    loading,
    error,
    register,
    login,
    googleLogin,
    logout,
    forgotPassword,
    updateProfile,
    enroll,
    unenroll,
    isEnrolled,
    isFirebaseConfigured
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
