import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Sustainability from './pages/Sustainability';
import CustomStudio from './pages/CustomStudio';
import ProductDetails from './pages/ProductDetails';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SommelierChat from './components/SommelierChat';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <div className="app">
            <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/custom" element={<CustomStudio />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </main>
            
            <SommelierChat />
            <CartDrawer />
            <CheckoutModal />

            <footer style={{ padding: '80px 0', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
              <div className="container">
                <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '16px', letterSpacing: '-0.04em' }}>water bottle.</div>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} water bottle. Designed to feel alive.</p>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
