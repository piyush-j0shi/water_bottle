import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Shield, ThermometerSnowflake, Leaf } from 'lucide-react';
import './Features.css';

const featureData = [
  {
    icon: <ThermometerSnowflake size={32} />,
    title: "24h Cold",
    description: "Double-wall vacuum insulation keeps your water ice cold for up to 24 hours."
  },
  {
    icon: <Shield size={32} />,
    title: "Pro-Grade Steel",
    description: "Crafted with 18/8 pro-grade stainless steel to ensure pure taste and no flavor transfer."
  },
  {
    icon: <Droplets size={32} />,
    title: "Leak-Proof",
    description: "Precision engineered cap guarantees absolutely no leaks, ever."
  },
  {
    icon: <Leaf size={32} />,
    title: "Eco-Conscious",
    description: "Built to last a lifetime, replacing thousands of single-use plastic bottles."
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">Form meets function.</h2>
          <p className="section-subtitle">Every detail has been meticulously engineered to create the ultimate hydration experience.</p>
        </motion.div>

        <div className="features-grid">
          {featureData.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
