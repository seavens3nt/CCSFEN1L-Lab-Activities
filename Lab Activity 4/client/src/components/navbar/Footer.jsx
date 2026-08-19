import { NavLink } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="footer-label">BlogSpace</p>
        <span>A student-built blog application.</span>
      </div>

      <nav className="footer-links" aria-label="Footer navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about-us">About</NavLink>
        <NavLink to="/contact-us">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>

      <p className="footer-copy">&copy; 2026 BlogSpace</p>
    </footer>
  )
}

export default Footer
