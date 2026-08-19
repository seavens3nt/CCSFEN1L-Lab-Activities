import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/navbar/Header'
import Footer from './components/navbar/Footer'
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage'
import ContactPage from './components/pages/ContactPage'
import LoginPage from './components/pages/LoginPage'
import BlogDetailsPage from './components/pages/BlogDetailsPage'

function App() {
  return (
    <Router>
      <div className="page-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
