import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero';
import Design from '../components/Design';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform vertical scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0.2, 0.8], ["10%", "-60%"]);

  return (
    <div className="home-page">
      <Hero />
      
      <section className="manifesto-section">
        <div className="container">
          <div className="manifesto-mask">
            <motion.h2 
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Crafted for those who demand purity.
            </motion.h2>
          </div>
          <div className="manifesto-mask">
            <motion.h2 
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Engineered to outlast a lifetime.
            </motion.h2>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Hijack Section */}
      <section ref={containerRef} className="horizontal-scroll-container">
        <div className="sticky-wrapper">
          <div className="horizontal-scroll-header">
            <h2>The Gallery</h2>
            <p>Scroll to explore.</p>
          </div>
          <motion.div style={{ x }} className="horizontal-scroll-track">
            {products.slice(0, 5).map((product, idx) => (
              <div key={product.id} className="horizontal-card">
                <img src={product.image} alt={product.name} />
                <div className="horizontal-card-info">
                  <h3>{product.name}</h3>
                  <p>{product.vibe}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Design />
    </div>
  );
};

export default Home;
