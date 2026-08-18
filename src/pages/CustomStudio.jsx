import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import MagneticButton from '../components/MagneticButton';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './CustomStudio.css';

const FANCY_COLORS = [
  { hex: '#ffffff', name: 'Titanium White' },
  { hex: '#000000', name: 'Obsidian Black' },
  { hex: '#d4af37', name: '24K Gold' },
  { hex: '#e5e4e2', name: 'Brushed Platinum' },
  { hex: '#b76e79', name: 'Rose Gold' }
];

const CustomStudio = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  
  const queryParams = new URLSearchParams(location.search);
  const initialProductId = queryParams.get('product') || products[0].id;

  const [engravingText, setEngravingText] = useState('YOUR NAME');
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [fontStyle, setFontStyle] = useState('var(--font-family)');
  const [engravingColor, setEngravingColor] = useState('#ffffff');
  const [orientation, setOrientation] = useState('horizontal');
  const [isINR, setIsINR] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
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
    const textureData = canvasRef.current ? canvasRef.current.toDataURL() : null;
    
    addToCart({
      ...selectedProduct,
      price: basePrice + customFee,
      customization: {
        text: engravingText,
        font: fontStyle,
        color: engravingColor,
        orientation: orientation,
        texture: textureData
      },
      name: `${selectedProduct.name} (Custom)`
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

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

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // 1. Capture the visual preview container
      const previewEl = document.getElementById('studio-preview-capture');
      const previewCanvas = await html2canvas(previewEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#111111'
      });
      const imgData = previewCanvas.toDataURL('image/jpeg', 1.0);

      // 2. Inject image data into the hidden PDF template
      document.getElementById('pdf-captured-image').src = imgData;

      // Give the DOM a tiny moment to paint the injected image source
      await new Promise(r => setTimeout(r, 100));

      // 3. Capture Page 1 DOM
      const page1El = document.getElementById('pdf-page-1');
      const page1Canvas = await html2canvas(page1El, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0a0a'
      });
      const page1Img = page1Canvas.toDataURL('image/jpeg', 1.0);

      // 4. Capture Page 2 DOM
      const page2El = document.getElementById('pdf-page-2');
      const page2Canvas = await html2canvas(page2El, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0a0a'
      });
      const page2Img = page2Canvas.toDataURL('image/jpeg', 1.0);

      // 5. Initialize PDF and stitch it together
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add Page 1
      pdf.addImage(page1Img, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // Add Page 2
      pdf.addPage();
      pdf.addImage(page2Img, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // 6. Download
      pdf.save(`${selectedProduct.name.replace(/\s+/g, '_')}_Blueprint.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
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
            <div className="preview-container" id="studio-preview-capture">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              
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

              {/* Tightly bound container for true engraving bounds */}
              <div className="engraving-overlay">
                <span 
                  className={`engraved-text ${orientation === 'vertical' ? 'vertical' : ''}`}
                  style={{ 
                    fontFamily: fontStyle, 
                    color: engravingColor,
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
              <label>Orientation</label>
              <div className="font-options">
                <button 
                  className={`font-btn ${orientation === 'horizontal' ? 'active' : ''}`} 
                  onClick={() => setOrientation('horizontal')}
                >Horizontal</button>
                <button 
                  className={`font-btn ${orientation === 'vertical' ? 'active' : ''}`} 
                  onClick={() => setOrientation('vertical')}
                >Vertical</button>
              </div>
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
                {FANCY_COLORS.map(colorObj => (
                  <button 
                    key={colorObj.hex}
                    className={`color-swatch ${engravingColor === colorObj.hex ? 'active' : ''}`}
                    style={{ backgroundColor: colorObj.hex }}
                    onClick={() => setEngravingColor(colorObj.hex)}
                    aria-label={`Select color ${colorObj.name}`}
                    title={colorObj.name}
                  />
                ))}
              </div>
              <span className="color-name-display">
                {FANCY_COLORS.find(c => c.hex === engravingColor)?.name}
              </span>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <MagneticButton>
                <button 
                  className={`btn-primary studio-buy-btn ${isAdded ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? 'Added to Cart!' : 'Add Custom to Cart'}
                </button>
              </MagneticButton>
              
              <button 
                className="btn-secondary studio-pdf-btn"
                onClick={generatePDF}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Download Blueprint (PDF)'}
              </button>
            </div>

          </motion.div>
        </div>
      </div>

      {/* HIDDEN LUXURY PDF TEMPLATES */}
      <div style={{ position: 'absolute', top: '-15000px', left: '-15000px', width: '800px', background: '#0a0a0a', pointerEvents: 'none' }}>
        
        {/* PAGE 1: LORE */}
        <div id="pdf-page-1" className="pdf-template-page">
          <div className="pdf-header">
            <h1 style={{ fontFamily: 'serif' }}>{selectedProduct.name}</h1>
            <div className="pdf-divider"></div>
          </div>
          
          <div className="pdf-content">
            <div className="pdf-section">
              <h3>MATERIAL</h3>
              <p>{selectedProduct.material}</p>
            </div>
            
            <div className="pdf-section">
              <h3>THE STORY</h3>
              <p>{selectedProduct.story}</p>
            </div>
            
            <div className="pdf-section">
              <h3>MANUFACTURING</h3>
              <p>{selectedProduct.manufacturing}</p>
            </div>
          </div>
          <div className="pdf-footer">Awwwards Water Bottle Co. - Confidential Blueprint</div>
        </div>

        {/* PAGE 2: BLUEPRINT / SPECIFICATION */}
        <div id="pdf-page-2" className="pdf-template-page">
          <div className="pdf-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h1 style={{ fontFamily: 'serif', margin: 0 }}>Specification Sheet</h1>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', paddingBottom: '8px' }}>
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div className="pdf-divider" style={{ marginTop: '20px' }}></div>
          </div>
          
          <div className="pdf-spec-grid">
            {/* Left Column: Image & Base Specs */}
            <div className="pdf-image-col">
              <div className="pdf-image-container">
                <img id="pdf-captured-image" src="" alt="Custom Bottle" />
              </div>
              <div className="pdf-base-specs">
                <h4>Technical Data</h4>
                <div className="spec-row"><span>Base Model:</span> <strong>{selectedProduct.name}</strong></div>
                <div className="spec-row"><span>Material Core:</span> <strong>{selectedProduct.material}</strong></div>
                <div className="spec-row"><span>Capacity:</span> <strong>Standard Issue</strong></div>
              </div>
            </div>
            
            {/* Right Column: Configuration & Cost Breakdown */}
            <div className="pdf-cost-col">
              <h4 style={{ marginBottom: '24px' }}>Bespoke Configuration</h4>
              
              <div className="spec-row"><span>Engraving Name:</span> <strong>{engravingText || 'None'}</strong></div>
              <div className="spec-row"><span>Typography Style:</span> <strong>{fontStyle === 'var(--font-family)' ? 'Modern' : fontStyle === 'serif' ? 'Classic' : 'Technical'}</strong></div>
              <div className="spec-row"><span>Laser Orientation:</span> <strong>{orientation}</strong></div>
              <div className="spec-row"><span>Finish Color:</span> <strong>{FANCY_COLORS.find(c => c.hex === engravingColor)?.name || engravingColor}</strong></div>
              
              <div className="pdf-receipt" style={{ marginTop: 'auto' }}>
                <h4 style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Investment Summary</h4>
                
                <div className="receipt-row"><span>Base Instrument</span> <span>{displayPrice(basePrice)}</span></div>
                <div className="receipt-row"><span>Custom Studio Integration</span> <span>+{displayPrice(customFee)}</span></div>
                <div className="receipt-row"><span>Taxes & Handling</span> <span>Included</span></div>
                
                <div className="receipt-total" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '24px', paddingTop: '24px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '400' }}>Total Price</span> 
                  <span style={{ fontSize: '1.75rem' }}>{displayPrice(basePrice + customFee)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pdf-footer" style={{ marginTop: '40px' }}>Awwwards Water Bottle Co. - Configurator Export</div>
        </div>
      </div>
    </div>
  );
};

export default CustomStudio;
