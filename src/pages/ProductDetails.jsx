import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Droplets, ShieldCheck, ThermometerSnowflake, Leaf } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import MagneticButton from '../components/MagneticButton';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('story');
  const [isAdded, setIsAdded] = useState(false);

  // Parallax Tilt State
  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const rotateX = useTransform(y, [0, 400], [5, -5]);
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(200);
    y.set(200);
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pdp-page">
      <div className="container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} /> Back to Collection
        </Link>
        
        <div className="pdp-grid">
          <motion.div 
            className="pdp-image-section"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="pdp-main-image"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, perspective: 1000 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img 
                src={product.image} 
                alt={product.name}
              />
              <div className="pdp-glow-effect"></div>
            </motion.div>
            
            <div className="pdp-features-row">
              <div className="feature-icon"><ThermometerSnowflake size={24} /><span>Temp Control</span></div>
              <div className="feature-icon"><Droplets size={24} /><span>Leak Proof</span></div>
              <div className="feature-icon"><ShieldCheck size={24} /><span>Durable</span></div>
              <div className="feature-icon"><Leaf size={24} /><span>Eco-Friendly</span></div>
            </div>
          </motion.div>

          <motion.div 
            className="pdp-info-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pdp-vibe">{product.vibe} Collection</div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h1 
                className="pdp-title"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {product.name}
              </motion.h1>
            </div>
            <div className="pdp-price">${product.price.toFixed(2)}</div>
            
            <div className="pdp-tabs">
              <button 
                className={`tab-btn ${activeTab === 'story' ? 'active' : ''}`}
                onClick={() => setActiveTab('story')}
              >
                The Story
              </button>
              <button 
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Specs & Craft
              </button>
              <button 
                className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'story' && (
                <motion.div 
                  key="story"
                  className="pdp-tab-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="pdp-description">{product.story}</p>
                </motion.div>
              )}
              
              {activeTab === 'specs' && (
                <motion.div 
                  key="specs"
                  className="pdp-tab-content pdp-specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="pdp-description" style={{ marginBottom: '24px' }}>
                    <strong>Manufacturing:</strong> {product.manufacturing}
                  </p>
                  <div className="spec-item">
                    <span className="spec-label">Material</span>
                    <span className="spec-value">{product.material}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Color</span>
                    <span className="spec-value">{product.color}</span>
                  </div>
                  {product.capacity && (
                    <div className="spec-item">
                      <span className="spec-label">Capacity</span>
                      <span className="spec-value">{product.capacity}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="spec-item">
                      <span className="spec-label">Weight</span>
                      <span className="spec-value">{product.weight}</span>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div 
                  key="shipping"
                  className="pdp-tab-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="pdp-description">{product.shipping}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pdp-actions">
              <MagneticButton>
                <div 
                  className={`btn-primary pdp-buy-btn ${isAdded ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={20} /> 
                  {isAdded ? 'Added to Cart!' : `Add to Cart - $${product.price.toFixed(2)}`}
                </div>
              </MagneticButton>
              <Link to={`/custom?product=${product.id}`} className="btn-secondary pdp-customize-btn">
                Customize in Studio
              </Link>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
