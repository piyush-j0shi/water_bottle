import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, MessageSquare } from 'lucide-react';
import './Hero.css';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const [audioActive, setAudioActive] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const [volume, setVolume] = useState(0);
  const requestRef = useRef();

  const toggleAudio = async () => {
    if (audioActive) {
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current) await audioContextRef.current.close();
      cancelAnimationFrame(requestRef.current);
      setAudioActive(false);
      setVolume(0);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        let avg = sum / bufferLength;
        // Map average volume to a scale multiplier (e.g. 1 to 1.15)
        setVolume(1 + (avg / 256) * 0.3);
        requestRef.current = requestAnimationFrame(updateVolume);
      };
      
      updateVolume();
      setAudioActive(true);
    } catch (err) {
      console.error("Audio access denied", err);
    }
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <section className="hero">
      <motion.div 
        className="hero-background"
        animate={{ scale: audioActive ? volume : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="hero-gradient-overlay" />
      </motion.div>
      
      <div className="container hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>Hydration. <br /> Perfected.</h1>
          <p>The ultimate vessel for your everyday journey.</p>
          
          <div className="hero-actions">
            <MagneticButton>
              <a href="/shop" className="btn-primary">Shop Collection</a>
            </MagneticButton>
            
            {/* Audio Reactive Toggle */}
            <button 
              className={`audio-btn ${audioActive ? 'active' : ''}`} 
              onClick={toggleAudio}
              title="Enable Audio-Reactive Environment"
            >
              {audioActive ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
