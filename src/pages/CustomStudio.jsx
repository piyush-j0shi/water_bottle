import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './CustomStudio.css';

const CustomStudio = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Read ?product=id from URL, fallback to products[0]
  const queryParams = new URLSearchParams(location.search);
  const initialProductId = queryParams.get('product') || products[0].id;

  const [engravingText, setEngravingText] = useState('YOUR NAME');
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [fontStyle, setFontStyle] = useState('var(--font-family)');
  const [engravingColor, setEngravingColor] = useState('#ffffff');
  const [isINR, setIsINR] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // Generative Canvas State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Detect India Timezone for Smart Pricing
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Asia/Calcutta' || timezone === 'Asia/Kolkata') {
      setIsINR(true);
    }
  }, []);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const basePrice = selectedProduct.price;
  const customFee = 15.00;
  
  const displayPrice = (price) => {
    if (isINR) {
      return `₹${(price * 83).toFixed(0)}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    // Save canvas data if drawn
    const textureData = canvasRef.current ? canvasRef.current.toDataURL() : null;
    
    addToCart({
      ...selectedProduct,
      price: basePrice + customFee, // update price for custom
      customization: {
        text: engravingText,
        font: fontStyle,
        color: engravingColor,
        texture: textureData
      },
      name: `${selectedProduct.name} (Custom)`
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Generative Canvas Logic
  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };
  const endDrawing = () => setIsDrawing(false);
  
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'lighter';
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
    // Random vibrant colors for generative texture
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    gradient.addColorStop(0, `rgba(${r},${g},${b}, 0.5)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="custom-studio-page">
      <div className="container">
        <div className="studio-header">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Engrave text or draw a 1-of-1 generative texture.
          </motion.p>
        </div>

        <div className="studio-grid">
          <motion.div 
            className="studio-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="preview-container">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              
              {/* Generative Texture Canvas overlaying the bottle body */}
              <canvas 
                ref={canvasRef}
                width={300}
                height={500}
                className="generative-canvas"
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                onMouseMove={draw}
              />
              <div className="canvas-instruction">Drag to paint texture</div>

              <div className="engraving-overlay">
                <span 
                  className="engraved-text"
                  style={{ 
                    fontFamily: fontStyle, 
                    color: engravingColor,
                    // Simulate cylindrical wrapping
                    transform: 'rotateX(5deg) scaleX(0.85) perspective(500px) rotateY(-10deg)',
                    display: 'inline-block'
                  }}
                >
                  {engravingText || 'YOUR NAME'}
                </span>
              </div>
            </div>
            
            <div className="product-selector-carousel">
              {products.map(p => (
                <div 
                  key={p.id} 
                  className={`carousel-item ${p.id === selectedProductId ? 'active' : ''}`}
                  onClick={() => setSelectedProductId(p.id)}
                >
                  <img src={p.image} alt={p.name} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="studio-controls"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="control-group">
              <label>Engraving Text</label>
              <input 
                type="text" 
                maxLength={12}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="Enter name (max 12)"
              />
              <span className="char-count">{engravingText.length} / 12 characters</span>
            </div>

            <div className="control-group">
              <label>Select Font Style</label>
              <div className="font-options">
                <button 
                  className={`font-btn ${fontStyle === 'var(--font-family)' ? 'active' : ''}`} 
                  onClick={() => setFontStyle('var(--font-family)')}
                  style={{ fontFamily: 'var(--font-family)' }}>Modern</button>
                <button 
                  className={`font-btn ${fontStyle === 'serif' ? 'active' : ''}`} 
                  onClick={() => setFontStyle('serif')}
                  style={{ fontFamily: 'serif' }}>Classic</button>
                <button 
                  className={`font-btn ${fontStyle === 'monospace' ? 'active' : ''}`} 
                  onClick={() => setFontStyle('monospace')}
                  style={{ fontFamily: 'monospace' }}>Technical</button>
              </div>
            </div>
            
            <div className="control-group">
              <label>Text Color</label>
              <div className="color-options">
                {['#ffffff', '#000000', '#d4af37', '#e5e4e2', '#b76e79'].map(color => (
                  <button 
                    key={color}
                    className={`color-swatch ${engravingColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setEngravingColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="studio-price-box">
              <div className="price-row">
                <span>{selectedProduct.name}</span>
                <span>{displayPrice(basePrice)}</span>
              </div>
              <div className="price-row">
                <span>Custom Studio Fee</span>
                <span>+{displayPrice(customFee)}</span>
              </div>
              <div className="price-total">
                <span>Total</span>
                <span>{displayPrice(basePrice + customFee)}</span>
              </div>
            </div>

            <MagneticButton>
              <button 
                className={`btn-primary studio-buy-btn ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? 'Added to Cart!' : 'Add Custom to Cart'}
              </button>
            </MagneticButton>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomStudio;
