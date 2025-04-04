import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PixelButton from './PixelButton';
import { motion } from 'framer-motion';
import useAuth from '@/hooks/useAuth';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1A0B2E]/90 backdrop-blur-sm py-4 shadow-[0_4px_10px_rgba(255,102,179,0.2)] border-b-2 border-[#FF66B3]/50`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <motion.div 
              className="text-[#A3F0E0] font-bold text-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              Community MushroomLand
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-[#FF66B3] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/90 hover:text-[#A3F0E0] transition-colors text-lg">
            Home
          </Link>
          <Link to="/bulletin" className="text-white/90 hover:text-[#A3F0E0] transition-colors text-lg">
            Bulletin Board
          </Link>
          <Link to="/dressroom" className="text-white/90 hover:text-[#A3F0E0] transition-colors text-lg">
            Dressroom
          </Link>
          <Link to="/game" className="text-white/90 hover:text-[#A3F0E0] transition-colors text-lg">
            Game
          </Link>
        </div>
        
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="hidden md:inline text-[#FF66B3] font-bold text-lg">
                Welcome, {user.username}
              </span>
              <PixelButton variant="login" size="md" onClick={handleLogout}>
                Logout
              </PixelButton>
            </>
          ) : (
            <>
              <Link to="/login">
                <PixelButton variant="login" size="md">
                  Login
                </PixelButton>
              </Link>
              <Link to="/register">
                <PixelButton variant="primary" size="md">
                  Sign Up
                </PixelButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default NavBar;
