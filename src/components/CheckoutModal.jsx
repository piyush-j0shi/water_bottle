import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Apple, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CheckoutModal.css';

const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartTotal } = useCart();
  const [step, setStep] = useState('payment'); // payment | success

  const handlePayment = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const closeAndReset = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => setStep('payment'), 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div 
            className="checkout-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 'success' ? closeAndReset : undefined}
          />
          <motion.div 
            className="checkout-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <button className="checkout-close-btn" onClick={closeAndReset}>
              <X size={24} />
            </button>

            {step === 'payment' && (
              <div className="checkout-content">
                <h2>Secure Checkout</h2>
                <p className="checkout-total">Total: ${cartTotal.toFixed(2)}</p>

                <div className="express-checkout">
                  <button className="apple-pay-btn"><Apple size={18} /> Pay</button>
                  <button className="google-pay-btn">G Pay</button>
                </div>

                <div className="divider">
                  <span>or pay with card</span>
                </div>

                <form className="payment-form" onSubmit={handlePayment}>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="hello@example.com" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Card Information</label>
                    <div className="card-input-container">
                      <CreditCard size={18} className="card-icon" />
                      <input type="text" placeholder="Card number" required />
                    </div>
                    <div className="card-input-row">
                      <input type="text" placeholder="MM / YY" required />
                      <input type="text" placeholder="CVC" required />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary pay-now-btn">
                    Pay ${cartTotal.toFixed(2)}
                  </button>
                </form>
              </div>
            )}

            {step === 'processing' && (
              <div className="checkout-success">
                <motion.div 
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <h2>Processing Payment...</h2>
              </div>
            )}

            {step === 'success' && (
              <div className="checkout-success">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle size={64} color="#10b981" />
                </motion.div>
                <h2>Payment Successful!</h2>
                <p>Thank you for your order. We're getting your bottles ready.</p>
                <button className="btn-primary" onClick={closeAndReset} style={{ marginTop: '24px' }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
