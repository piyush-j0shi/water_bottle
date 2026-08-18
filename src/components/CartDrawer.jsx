import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    isCartOpen, setIsCartOpen, 
    cartItems, updateQuantity, removeFromCart, 
    cartTotal 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout-processing');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className="tactical-case-drawer"
            initial={{ x: '100%', rotateY: -10 }}
            animate={{ x: 0, rotateY: 0 }}
            exit={{ x: '100%', rotateY: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            style={{ perspective: 1000 }}
          >
            <div className="case-latch case-latch-top"></div>
            <div className="case-latch case-latch-bottom"></div>

            <div className="cart-header">
              <div className="header-labels">
                <span className="case-code">CASE ID: AWW-0992</span>
                <h2>SECURE PAYLOAD</h2>
              </div>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} className="empty-icon" />
                  <p>Payload bay is empty.</p>
                  <button className="btn-primary" onClick={() => setIsCartOpen(false)}>
                    Initialize Selection
                  </button>
                </div>
              ) : (
                <div className="cart-items foam-insert">
                  <AnimatePresence>
                    {cartItems.map((item, idx) => (
                      <motion.div 
                        key={item.id + idx} 
                        className="cart-item foam-cutout"
                        layout
                        initial={{ opacity: 0, scale: 0.8, z: -50 }}
                        animate={{ opacity: 1, scale: 1, z: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p className="cart-item-price">${item.price.toFixed(2)}</p>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                            <span className="qty-display">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                          </div>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <X size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer tactical-panel">
                <div className="panel-screen">
                  <div className="cart-total">
                    <span>SUBTOTAL</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="shipping-text">LOGISTICS & TAXES CALCULATED AT CHECKOUT</p>
                </div>
                <button className="btn-primary checkout-btn tactical-deploy-btn" onClick={handleCheckout}>
                  AUTHORIZE DEPLOYMENT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
