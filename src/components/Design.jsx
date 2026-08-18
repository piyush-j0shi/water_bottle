import React from 'react';
import { motion } from 'framer-motion';
import './Design.css';

const Design = () => {
  return (
    <section id="design" className="design-section">
      <div className="container">
        <div className="design-grid">
          <motion.div 
            className="design-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Design Philosophy</span>
            <h2 className="section-title">Less, but better.</h2>
            <p className="design-description">
              We stripped away everything non-essential to create a water bottle that is purely functional and aesthetically timeless. The powder-coated matte finish provides a superior grip while resisting condensation and scratches.
            </p>
            <p className="design-description">
              The cap features a low-profile handle engineered for perfect balance, allowing you to carry your hydration effortlessly throughout the day.
            </p>
            <ul className="design-list">
              <li>Ergonomic lip profile for smooth flow</li>
              <li>Condensation-free exterior</li>
              <li>Fits most standard cup holders</li>
            </ul>
          </motion.div>

          <motion.div 
            className="design-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="design-image-placeholder">
              <img src="/hero_bottle_1_1787036661426.jpg" alt="Water Bottle Design Detail" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Design;
