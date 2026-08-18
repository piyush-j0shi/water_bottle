import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${location.pathname !== '/' ? 'navbar-solid' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          water bottle.
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/sustainability" className="nav-link">Sustainability</Link>
          <Link to="/custom" className="nav-link">Studio</Link>
          <Link to="/coming-soon" className="nav-link">Coming Soon</Link>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
          </button>
          <Link to="/shop" className="btn-primary buy-btn" style={{ textDecoration: 'none' }}>Shop Now</Link>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-header">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>water bottle.</Link>
              <button onClick={closeMobileMenu}>
                <X size={24} />
              </button>
            </div>
            <div className="mobile-menu-links">
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
              <Link to="/shop" onClick={closeMobileMenu}>Shop</Link>
              <Link to="/about" onClick={closeMobileMenu}>About</Link>
              <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
              <Link to="/sustainability" onClick={closeMobileMenu}>Sustainability</Link>
              <Link to="/custom" onClick={closeMobileMenu}>Studio</Link>
              <Link to="/coming-soon" onClick={closeMobileMenu}>Coming Soon</Link>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button className="theme-toggle-btn" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
                </button>
              </div>
              <Link to="/shop" className="btn-primary mobile-buy-btn" style={{ textDecoration: 'none', textAlign: 'center' }} onClick={closeMobileMenu}>Shop Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
