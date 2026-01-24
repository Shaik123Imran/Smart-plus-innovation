import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore'

// Firebase configuration - Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
}

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== ""

let app, auth, db, googleProvider

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    googleProvider = new GoogleAuthProvider()
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message)
  }
}

// Demo mode storage (when Firebase is not configured)
const DEMO_USERS_KEY = 'smartplus_demo_users'
const DEMO_CURRENT_USER_KEY = 'smartplus_demo_current_user'

const getDemoUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '{}')
  } catch {
    return {}
  }
}

const saveDemoUsers = (users) => {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users))
}

const getDemoCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(DEMO_CURRENT_USER_KEY) || 'null')
  } catch {
    return null
  }
}

const saveDemoCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(DEMO_CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(DEMO_CURRENT_USER_KEY)
  }
}

// Auth functions
export const registerUser = async (email, password, displayName) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      displayName,
      enrolledCourses: [],
      createdAt: serverTimestamp()
    })
    
    return userCredential.user
  } else {
    // Demo mode
    const users = getDemoUsers()
    if (users[email]) {
      throw new Error('Email already registered')
    }
    
    const uid = 'demo_' + Date.now()
    const user = {
      uid,
      email,
      displayName,
      enrolledCourses: [],
      createdAt: new Date().toISOString()
    }
    
    users[email] = { ...user, password }
    saveDemoUsers(users)
    saveDemoCurrentUser(user)
    
    return user
  }
}

export const loginUser = async (email, password) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } else {
    // Demo mode
    const users = getDemoUsers()
    const userData = users[email]
    
    if (!userData) {
      throw new Error('User not found. Please register first.')
    }
    
    if (userData.password !== password) {
      throw new Error('Invalid password')
    }
    
    const user = { ...userData }
    delete user.password
    saveDemoCurrentUser(user)
    
    return user
  }
}

export const loginWithGoogle = async () => {
  if (isFirebaseConfigured && auth && googleProvider) {
    const result = await signInWithPopup(auth, googleProvider)
    
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        enrolledCourses: [],
        createdAt: serverTimestamp()
      })
    }
    
    return result.user
  } else {
    throw new Error('Google Sign-In requires Firebase configuration. Please use email/password login or contact support to set up Firebase.')
  }
}

export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth)
  }
  saveDemoCurrentUser(null)
}

export const resetPassword = async (email) => {
  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, email)
    return { success: true, message: 'Password reset email sent! Check your inbox.' }
  } else {
    // Demo mode
    const users = getDemoUsers()
    if (!users[email]) {
      throw new Error('No account found with this email address.')
    }
    // In demo mode, we'll just show a message
    return { 
      success: true, 
      message: 'Demo Mode: Password reset would be sent to ' + email + '. For demo, use your existing password or register a new account.',
      demo: true
    }
  }
}

// User functions
export const getUserData = async (uid) => {
  if (isFirebaseConfigured && db) {
    const userDoc = await getDoc(doc(db, 'users', uid))
    return userDoc.exists() ? userDoc.data() : null
  } else {
    // Demo mode
    const users = getDemoUsers()
    const user = Object.values(users).find(u => u.uid === uid)
    if (user) {
      const { password, ...userData } = user
      return userData
    }
    return null
  }
}

export const updateUserData = async (uid, data) => {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, 'users', uid), data)
  } else {
    // Demo mode
    const users = getDemoUsers()
    const email = Object.keys(users).find(e => users[e].uid === uid)
    if (email) {
      users[email] = { ...users[email], ...data }
      saveDemoUsers(users)
      
      const currentUser = getDemoCurrentUser()
      if (currentUser && currentUser.uid === uid) {
        saveDemoCurrentUser({ ...currentUser, ...data })
      }
    }
  }
}

// Enrollment functions
export const enrollInCourse = async (uid, courseId) => {
  if (isFirebaseConfigured && db) {
    const userRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      const enrolledCourses = userDoc.data().enrolledCourses || []
      if (!enrolledCourses.includes(courseId)) {
        await updateDoc(userRef, {
          enrolledCourses: [...enrolledCourses, courseId]
        })
      }
    }
  } else {
    // Demo mode
    const users = getDemoUsers()
    const email = Object.keys(users).find(e => users[e].uid === uid)
    if (email) {
      const enrolledCourses = users[email].enrolledCourses || []
      if (!enrolledCourses.includes(courseId)) {
        users[email].enrolledCourses = [...enrolledCourses, courseId]
        saveDemoUsers(users)
        
        const currentUser = getDemoCurrentUser()
        if (currentUser && currentUser.uid === uid) {
          saveDemoCurrentUser({ ...currentUser, enrolledCourses: users[email].enrolledCourses })
        }
      }
    }
  }
}

export const unenrollFromCourse = async (uid, courseId) => {
  if (isFirebaseConfigured && db) {
    const userRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      const enrolledCourses = userDoc.data().enrolledCourses || []
      await updateDoc(userRef, {
        enrolledCourses: enrolledCourses.filter(id => id !== courseId)
      })
    }
  } else {
    // Demo mode
    const users = getDemoUsers()
    const email = Object.keys(users).find(e => users[e].uid === uid)
    if (email) {
      users[email].enrolledCourses = (users[email].enrolledCourses || []).filter(id => id !== courseId)
      saveDemoUsers(users)
      
      const currentUser = getDemoCurrentUser()
      if (currentUser && currentUser.uid === uid) {
        saveDemoCurrentUser({ ...currentUser, enrolledCourses: users[email].enrolledCourses })
      }
    }
  }
}

// Blog functions
export const createBlogPost = async (postData) => {
  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } else {
    // Demo mode - save to localStorage
    const blogs = JSON.parse(localStorage.getItem('smartplus_blogs') || '[]')
    const id = 'blog_' + Date.now()
    blogs.unshift({ id, ...postData, createdAt: new Date().toISOString() })
    localStorage.setItem('smartplus_blogs', JSON.stringify(blogs))
    return id
  }
}

export const getBlogPosts = async () => {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } else {
    return JSON.parse(localStorage.getItem('smartplus_blogs') || '[]')
  }
}

export const getBlogPost = async (id) => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'blogs', id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  } else {
    const blogs = JSON.parse(localStorage.getItem('smartplus_blogs') || '[]')
    return blogs.find(b => b.id === id) || null
  }
}

export const updateBlogPost = async (id, data) => {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, 'blogs', id), {
      ...data,
      updatedAt: serverTimestamp()
    })
  }
}

export const deleteBlogPost = async (id) => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'blogs', id))
  }
}

// Testimonial functions
export const submitTestimonial = async (testimonialData) => {
  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...testimonialData,
      approved: false,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } else {
    // Demo mode
    const testimonials = JSON.parse(localStorage.getItem('smartplus_testimonials') || '[]')
    const id = 'testimonial_' + Date.now()
    testimonials.push({ id, ...testimonialData, approved: true, createdAt: new Date().toISOString() })
    localStorage.setItem('smartplus_testimonials', JSON.stringify(testimonials))
    return id
  }
}

export const getApprovedTestimonials = async () => {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'testimonials'), where('approved', '==', true))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } else {
    return JSON.parse(localStorage.getItem('smartplus_testimonials') || '[]')
  }
}

// Contact form submission
export const submitContactForm = async (formData) => {
  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...formData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } else {
    // Demo mode - save locally
    const contacts = JSON.parse(localStorage.getItem('smartplus_contacts') || '[]')
    const id = 'contact_' + Date.now()
    contacts.push({ id, ...formData, createdAt: new Date().toISOString() })
    localStorage.setItem('smartplus_contacts', JSON.stringify(contacts))
    return id
  }
}

// Newsletter subscription
export const subscribeNewsletter = async (email) => {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'newsletter'), where('email', '==', email))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: serverTimestamp()
      })
      return true
    }
    return false
  } else {
    // Demo mode
    const newsletter = JSON.parse(localStorage.getItem('smartplus_newsletter') || '[]')
    if (!newsletter.includes(email)) {
      newsletter.push(email)
      localStorage.setItem('smartplus_newsletter', JSON.stringify(newsletter))
      return true
    }
    return false
  }
}

// Custom auth state observer for demo mode
export const onAuthStateChangedCustom = (callback) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, callback)
  } else {
    // Demo mode - check localStorage on load
    const user = getDemoCurrentUser()
    setTimeout(() => callback(user), 0)
    
    // Return unsubscribe function
    return () => {}
  }
}

export { auth, db, isFirebaseConfigured }
