import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Compliance from './pages/Compliance'
import News from './pages/News'
import Article from './pages/Article'
import Careers from './pages/Careers'
import Vacancy from './pages/Vacancy'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import { Accessibility, Complaints, Cookies, Privacy, Terms } from './pages/Legal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1c1f1d]">
      <ScrollToTop />
      <Header onSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:slug" element={<PropertyDetail />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<Article />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<Vacancy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-a-quote" element={<Quote />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
