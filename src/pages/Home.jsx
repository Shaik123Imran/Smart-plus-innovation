import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import FeaturedPrograms from '../components/home/FeaturedPrograms'
import Community from '../components/home/Community'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'

function Home() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <FeaturedPrograms />
      <Community />
      <Testimonials />
      <Newsletter />
    </Layout>
  )
}

export default Home
