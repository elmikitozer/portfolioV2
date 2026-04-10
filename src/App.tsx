import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="noise bg-bg min-h-screen">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
