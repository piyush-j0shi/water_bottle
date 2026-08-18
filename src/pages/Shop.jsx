import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Shop.css';

const categories = ['All', 'Minimal', 'Classy', 'Calm', 'Rugged', 'Active', 'Tech', 'Earthy'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.vibe === activeCategory);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore our bespoke hydration instruments.
        </motion.p>
        
        <div className="shop-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-gallery container">
        <AnimatePresence>
          <div className="masonry-grid">
            {filteredProducts.map((product, index) => {
              // Create asymmetrical sizes based on index
              let cardClass = 'masonry-item-regular';
              if (index % 5 === 0) cardClass = 'masonry-item-large';
              else if (index % 7 === 0) cardClass = 'masonry-item-tall';

              return (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`masonry-item ${cardClass}`}
                >
                  <Link to={`/product/${product.id}`} className="shop-card">
                    <div className="shop-card-image">
                      <img src={product.image} alt={product.name} />
                      <div className="shop-card-badge">{product.vibe}</div>
                    </div>
                    <div className="shop-card-info">
                      <h2>{product.name}</h2>
                      <p className="shop-card-material">{product.material}</p>
                      <p className="shop-card-price">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;
