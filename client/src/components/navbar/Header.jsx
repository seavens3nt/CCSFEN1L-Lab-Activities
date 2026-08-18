import { NavLink } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="site-header">
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink className="nav-tab" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-tab" to="/about-us">
          About Us
        </NavLink>
        <NavLink className="nav-tab" to="/contact-us">
          Contact Us
        </NavLink>
        <NavLink className="nav-tab" to="/login">
          Login
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
