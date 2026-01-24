import TopAnnouncementBar from './TopAnnouncementBar'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children, hideAnnouncement = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideAnnouncement && <TopAnnouncementBar />}
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
