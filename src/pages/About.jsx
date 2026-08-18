import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <div className="manifesto-mask">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              We don't make bottles.
            </motion.h1>
          </div>
          <div className="manifesto-mask">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We craft instruments.
            </motion.h1>
          </div>
        </div>

        <div className="about-grid">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>The Vision</h2>
            <p>
              In a world flooded with disposable plastics and poorly designed metal tubes, we set out to create something different. An instrument of hydration that you don't just use, but one that you form a relationship with.
            </p>
            <p>
              Every curve, every material choice, and every finish is the result of thousands of hours of obsessive engineering. We source aerospace-grade titanium, sustainably harvested bamboo, and pure borosilicate glass.
            </p>
          </motion.div>

          <motion.div 
            className="about-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/wooden_bottle_1787043317142.jpg" alt="Craftsmanship" />
          </motion.div>
        </div>

        <div className="about-grid" style={{ marginBottom: '120px' }}>
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" alt="Precision Manufacturing" />
          </motion.div>
          
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>The Process</h2>
            <p>
              We utilize zero-emission vacuum chambers and cold-forged Grade-5 Titanium. It takes over 40 individual steps to finish a single instrument.
            </p>
            <p>
              By combining ancient metallurgical techniques with cutting-edge robotic laser welding, we achieve a seam tolerance of 0.001mm. This is not mass production; this is bespoke engineering.
            </p>
          </motion.div>
        </div>
        
        <div className="about-cta">
          <h2>Ready to elevate your everyday?</h2>
          <MagneticButton>
            <a href="/shop" className="btn-primary" style={{ padding: '24px 48px', fontSize: '1.25rem' }}>
              Explore the Collection
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default About;
