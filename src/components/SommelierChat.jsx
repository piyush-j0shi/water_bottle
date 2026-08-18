import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import './SommelierChat.css';
import { products } from '../data/products';

const SommelierChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello. I am your personal hydration sommelier. Tell me about your lifestyle, and I'll find your perfect instrument.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      // Basic keyword matching for demo purposes
      const lower = userMsg.toLowerCase();
      let response = "That sounds fascinating.";
      let recommended = products[0];

      if (lower.includes('gym') || lower.includes('workout') || lower.includes('heavy')) {
        recommended = products.find(p => p.name.includes('Gallon')) || products[3];
        response = "For high-intensity output, you need maximum capacity and durability. I highly recommend the " + recommended.name + ".";
      } else if (lower.includes('office') || lower.includes('work') || lower.includes('elegant')) {
        recommended = products.find(p => p.name.includes('Carafe')) || products[1];
        response = "For a professional environment, aesthetics and purity are paramount. The " + recommended.name + " will elevate your desk space.";
      } else if (lower.includes('hike') || lower.includes('outdoor') || lower.includes('travel')) {
        recommended = products.find(p => p.name.includes('Canteen')) || products[3];
        response = "When every ounce matters, Grade-5 Titanium is the only answer. The " + recommended.name + " is built for the backcountry.";
      } else {
        recommended = products[Math.floor(Math.random() * products.length)];
        response = "Based on your unique profile, the " + recommended.name + " aligns perfectly with your energy.";
      }

      setMessages(prev => [...prev, { 
        text: response, 
        isBot: true,
        product: recommended 
      }]);
    }, 1500);
  };

  return (
    <>
      <button 
        className="sommelier-fab" 
        onClick={() => setIsOpen(true)}
        title="Consult the Water Sommelier"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="sommelier-drawer"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="sommelier-header">
              <div className="sommelier-title">
                <Bot size={20} />
                <h3>The Sommelier</h3>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>

            <div className="sommelier-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                  {msg.product && (
                    <a href={`/product/${msg.product.id}`} className="sommelier-product-card">
                      <img src={msg.product.image} alt={msg.product.name} />
                      <div>
                        <h4>{msg.product.name}</h4>
                        <p>View Details →</p>
                      </div>
                    </a>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="sommelier-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Describe your lifestyle..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SommelierChat;
