import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <div className="manifesto-mask">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's talk.
            </motion.h1>
          </div>
        </div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="contact-intro">
              Whether you're looking for enterprise wholesale, press inquiries, or just want to tell us how much you love your bottle, we're here.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <Mail size={24} />
                <h3>Email</h3>
                <p>hello@waterbottle.studio</p>
                <p>press@waterbottle.studio</p>
              </div>
              <div className="info-card">
                <MapPin size={24} />
                <h3>Studio</h3>
                <p>124 Bespoke Ave, Suite 9</p>
                <p>New York, NY 10012</p>
              </div>
              <div className="info-card">
                <Phone size={24} />
                <h3>Phone</h3>
                <p>+1 (800) 555-0199</p>
                <p>Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea required placeholder="How can we help?" rows={5}></textarea>
                  </div>
                  <MagneticButton>
                    <button type="submit" className="btn-primary submit-btn">
                      Send Message <ArrowRight size={16} />
                    </button>
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <h3>Message Received</h3>
                  <p>Our concierge team will get back to you within 24 hours.</p>
                  <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
