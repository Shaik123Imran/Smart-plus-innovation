import emailjs from '@emailjs/browser'

// EmailJS configuration - Replace with your own IDs from EmailJS dashboard
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

// Initialize EmailJS
emailjs.init(PUBLIC_KEY)

export const sendContactEmail = async (formData) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: formData.email // Sends to the user's email as well
    })
    return { success: true, response }
  } catch (error) {
    console.error('EmailJS Error:', error)
    return { success: false, error }
  }
}

export const sendEnrollmentConfirmation = async (userEmail, courseName) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: userEmail,
      subject: 'Course Enrollment Confirmation',
      message: `Congratulations! You have successfully enrolled in ${courseName}. We're excited to have you on board!`
    })
    return { success: true, response }
  } catch (error) {
    console.error('EmailJS Error:', error)
    return { success: false, error }
  }
}

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: userEmail,
      from_name: 'Smart Plus Innovation',
      subject: 'Welcome to Smart Plus Innovation!',
      message: `Hi ${userName},\n\nWelcome to Smart Plus Innovation! We're thrilled to have you join our learning community.\n\nExplore our programs and start your journey to success today!\n\nBest regards,\nSmart Plus Innovation Team`
    })
    return { success: true, response }
  } catch (error) {
    console.error('EmailJS Error:', error)
    return { success: false, error }
  }
}
