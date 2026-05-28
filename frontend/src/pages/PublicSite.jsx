import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Expose from '../components/Expose'
import Gallery from '../components/Gallery'
import Justice from '../components/Justice'
import ShareStory from '../components/ShareStory'
import EvidenceSubmission from '../components/EvidenceSubmission'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function PublicSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Expose />
        <Gallery />
        <Justice />
        <ShareStory />
        <EvidenceSubmission />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
