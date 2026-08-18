import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './ComingSoon.css';

const ComingSoon = () => {
  // The new products are IDs 10, 11, 12, 13, 14
  const upcomingProducts = products.filter(p => parseInt(p.id) >= 10);

  return (
    <div className="coming-soon-page">
      <div className="cs-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          The Next Era.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Unreleased prototypes from our engineering lab. Join the waitlist for early access.
        </motion.p>
      </div>

      <div className="cs-catalog container">
        {upcomingProducts.map((product, index) => (
          <motion.div 
            className={`cs-product-row ${index % 2 !== 0 ? 'cs-reverse' : ''}`}
            key={product.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cs-image-wrapper">
              <img src={product.image} alt={product.name} />
              <div className="cs-image-overlay"></div>
            </div>
            
            <div className="cs-info">
              <span className="cs-vibe">{product.vibe} Series</span>
              <h2>{product.name}</h2>
              <p className="cs-story">{product.story}</p>
              
              <div className="cs-specs">
                <div className="cs-spec-col">
                  <strong>Material</strong>
                  <span>{product.material}</span>
                </div>
                <div className="cs-spec-col">
                  <strong>Capacity</strong>
                  <span>{product.capacity}</span>
                </div>
                <div className="cs-spec-col">
                  <strong>Weight</strong>
                  <span>{product.weight}</span>
                </div>
              </div>
              
              <div className="cs-waitlist-form">
                <input type="email" placeholder="Enter your email" />
                <button className="btn-primary">Join Waitlist</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
