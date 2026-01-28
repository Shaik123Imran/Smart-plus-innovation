import { db, isFirebaseConfigured } from './firebase'
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore'

const STATS_KEY = 'smartplus_stats'
const DEFAULT_STATS = {
  activeStudents: 10000,
  partnerCompanies: 200,
  placementRate: 95,
  expertMentors: 50,
  countries: 30,
  studentRating: 4.9
}

// Get stats from Firebase or localStorage
export const getStats = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const statsDoc = await getDoc(doc(db, 'platform', 'stats'))
      if (statsDoc.exists()) {
        return statsDoc.data()
      } else {
        // Initialize with default stats
        await setDoc(doc(db, 'platform', 'stats'), {
          ...DEFAULT_STATS,
          updatedAt: serverTimestamp()
        })
        return DEFAULT_STATS
      }
    } catch (error) {
      console.error('Error fetching stats from Firebase:', error)
      return getLocalStats()
    }
  } else {
    return getLocalStats()
  }
}

// Get stats from localStorage (demo mode)
const getLocalStats = () => {
  try {
    const stored = localStorage.getItem(STATS_KEY)
    if (stored) {
      return JSON.parse(stored)
    } else {
      // Initialize with default stats
      localStorage.setItem(STATS_KEY, JSON.stringify(DEFAULT_STATS))
      return DEFAULT_STATS
    }
  } catch {
    return DEFAULT_STATS
  }
}

// Update stats (admin function)
export const updateStats = async (newStats) => {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'platform', 'stats'), {
        ...newStats,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  } else {
    // Demo mode - save to localStorage
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(newStats))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Increment stats (when user registers, enrolls, etc.)
export const incrementStat = async (statName) => {
  const currentStats = await getStats()
  const updatedStats = {
    ...currentStats,
    [statName]: (currentStats[statName] || 0) + 1
  }
  return await updateStats(updatedStats)
}

// Calculate dynamic stats from user data
export const calculateDynamicStats = async () => {
  if (isFirebaseConfigured && db) {
    try {
      // Get total users
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const totalUsers = usersSnapshot.size
      
      // Get enrolled courses count
      let totalEnrollments = 0
      usersSnapshot.forEach(doc => {
        const data = doc.data()
        totalEnrollments += (data.enrolledCourses?.length || 0)
      })
      
      // Get testimonials count
      const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'))
      const approvedTestimonials = testimonialsSnapshot.docs.filter(
        doc => doc.data().approved === true
      ).length
      
      // Calculate average rating from testimonials
      let totalRating = 0
      let ratingCount = 0
      testimonialsSnapshot.forEach(doc => {
        const data = doc.data()
        if (data.approved && data.rating) {
          totalRating += data.rating
          ratingCount++
        }
      })
      const avgRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 4.9
      
      return {
        activeStudents: totalUsers || DEFAULT_STATS.activeStudents,
        partnerCompanies: DEFAULT_STATS.partnerCompanies, // Keep static for now
        placementRate: DEFAULT_STATS.placementRate, // Keep static for now
        expertMentors: DEFAULT_STATS.expertMentors, // Keep static for now
        countries: DEFAULT_STATS.countries, // Keep static for now
        studentRating: parseFloat(avgRating),
        totalEnrollments
      }
    } catch (error) {
      console.error('Error calculating dynamic stats:', error)
      return DEFAULT_STATS
    }
  } else {
    // Demo mode - calculate from localStorage
    try {
      const users = JSON.parse(localStorage.getItem('smartplus_demo_users') || '{}')
      const totalUsers = Object.keys(users).length || DEFAULT_STATS.activeStudents
      
      let totalEnrollments = 0
      Object.values(users).forEach(user => {
        totalEnrollments += (user.enrolledCourses?.length || 0)
      })
      
      const testimonials = JSON.parse(localStorage.getItem('smartplus_testimonials') || '[]')
      const approvedTestimonials = testimonials.filter(t => t.approved !== false)
      
      let totalRating = 0
      approvedTestimonials.forEach(t => {
        if (t.rating) totalRating += t.rating
      })
      const avgRating = approvedTestimonials.length > 0 
        ? (totalRating / approvedTestimonials.length).toFixed(1) 
        : DEFAULT_STATS.studentRating
      
      return {
        activeStudents: totalUsers,
        partnerCompanies: DEFAULT_STATS.partnerCompanies,
        placementRate: DEFAULT_STATS.placementRate,
        expertMentors: DEFAULT_STATS.expertMentors,
        countries: DEFAULT_STATS.countries,
        studentRating: parseFloat(avgRating),
        totalEnrollments
      }
    } catch {
      return DEFAULT_STATS
    }
  }
}

// Format stats for display
export const formatStats = (stats) => {
  return [
    {
      number: `${stats.activeStudents.toLocaleString('en-IN')}+`,
      label: 'Active Students',
      icon: 'users',
      color: 'primary'
    },
    {
      number: `${stats.partnerCompanies}+`,
      label: 'Partner Companies',
      icon: 'building',
      color: 'secondary'
    },
    {
      number: `${stats.placementRate}%`,
      label: 'Placement Rate',
      icon: 'briefcase',
      color: 'accent'
    },
    {
      number: `${stats.expertMentors}+`,
      label: 'Expert Mentors',
      icon: 'mentor',
      color: 'primary'
    },
    {
      number: `${stats.countries}+`,
      label: 'Countries',
      icon: 'globe',
      color: 'secondary'
    },
    {
      number: `${stats.studentRating}/5`,
      label: 'Student Rating',
      icon: 'star',
      color: 'accent'
    }
  ]
}
