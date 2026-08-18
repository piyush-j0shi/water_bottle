import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Droplets, Leaf, TreePine } from 'lucide-react';
import './Sustainability.css';

const Sustainability = () => {
  return (
    <div className="sustainability-page">
      <div className="container">
        <div className="sust-header">
          <div className="manifesto-mask">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Beyond Carbon Neutral.
            </motion.h1>
          </div>
        </div>

        <div className="sust-stats-grid">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Globe size={32} />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              12,450,000
            </motion.h2>
            <p>Single-use plastic bottles diverted from oceans this year.</p>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <TreePine size={32} />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.6 }}
            >
              50,000+
            </motion.h2>
            <p>Trees planted through our reforestation partners.</p>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Droplets size={32} />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            >
              100M
            </motion.h2>
            <p>Gallons of clean drinking water funded globally.</p>
          </motion.div>
        </div>

        <motion.div 
          className="sust-hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', marginBottom: '80px' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=1000" 
            alt="Bamboo Forest" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        <div className="sust-mission">
          <motion.div 
            className="mission-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Our Mission</h3>
            <p>
              We believe that true luxury leaves zero footprint. Every component of our instruments, from the ethically sourced bamboo to the recycled aluminum, is meticulously tracked for its environmental impact. We don't just offset our carbon—we actively remove it.
            </p>
          </motion.div>
          <motion.div 
            className="mission-icon"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Leaf size={120} color="var(--color-accent)" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
