import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Expose from './components/Expose'
import Gallery from './components/Gallery'
import Justice from './components/Justice'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Expose />
        <Gallery />
        <Justice />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
