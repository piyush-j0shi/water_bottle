import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import './CheckoutStatus.css';

const CheckoutStatus = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="checkout-status-page">
      <motion.div 
        className="status-container aesthetic-body"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <motion.div 
          className="aesthetic-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle2 size={80} />
        </motion.div>
        
        <h1>The Future is Coming</h1>
        <p>Payment integration is currently in development for our next-generation architecture.</p>
        
        <div className="redirect-message">
          Returning you to the main page in <strong>{countdown}</strong> seconds...
        </div>
        
        <div className="refresh-hint">
          If you are not being redirected, please refresh the website.
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutStatus;
