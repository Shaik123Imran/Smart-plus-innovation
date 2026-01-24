import { useState } from 'react'

const announcements = [
  "🚀 New courses launching this month! Enroll now and get 20% off",
  "⭐ Join 10,000+ students already learning with us",
  "🎯 Limited time offer: Free career consultation for new members",
  "💡 Transform your skills with industry-expert mentors",
  "🔥 Summer batch registrations now open - Reserve your spot!",
]

function TopAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const duplicatedAnnouncements = [...announcements, ...announcements]

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-2 overflow-hidden relative">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Close announcement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="relative flex">
        <div className="flex animate-scroll whitespace-nowrap">
          {duplicatedAnnouncements.map((announcement, index) => (
            <span 
              key={index} 
              className="mx-8 text-sm font-medium inline-flex items-center"
            >
              {announcement}
              <span className="mx-8 text-white/50">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopAnnouncementBar
