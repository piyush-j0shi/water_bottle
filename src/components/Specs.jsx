import React from 'react';
import { motion } from 'framer-motion';
import './Specs.css';

const Specs = () => {
  return (
    <section id="specs" className="specs-section">
      <div className="container">
        <motion.div 
          className="specs-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Technical Specifications</span>
          <h2 className="section-title">Engineered to perform.</h2>
        </motion.div>

        <motion.div 
          className="specs-table-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <table className="specs-table">
            <tbody>
              <tr>
                <th>Volume</th>
                <td>24 oz (710 mL)</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>12.8 oz (362 g) empty</td>
              </tr>
              <tr>
                <th>Dimensions</th>
                <td>2.8" W x 10.8" H (7.1 cm x 27.4 cm)</td>
              </tr>
              <tr>
                <th>Materials</th>
                <td>18/8 Pro-Grade Stainless Steel, BPA-Free Polypropylene, Silicone</td>
              </tr>
              <tr>
                <th>Insulation</th>
                <td>Double-Wall Vacuum, Copper-Lined</td>
              </tr>
              <tr>
                <th>Thermal Performance</th>
                <td>24 Hours Cold / 12 Hours Hot</td>
              </tr>
              <tr>
                <th>Care Instructions</th>
                <td>Hand wash recommended for powder coat preservation. Cap is dishwasher safe.</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default Specs;
