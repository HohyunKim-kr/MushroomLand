import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import PixelButton from '@/components/PixelButton';
import useAuth from '@/hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    const success = await login(username, password);
    setIsLoading(false);

    if (success) {
      navigate('/');
    }
  };

  // Create 20 maple leaves with larger size and random positions
  const leaves = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    x: Math.random() * window.innerWidth,
    size: 60 + Math.random() * 30, // Size between 60–90px
    rotateOffset: Math.random() * 90,
  }));

  // Maple leaf falling animation
  const leafVariants: Variants = {
    initial: { opacity: 0, y: -20, rotate: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      y: [0, 300 + i * 20, 600],
      x: [0, i * 10, i * 40],
      rotate: [0, 30 + i * 10, 90],
      transition: {
        duration: 8 + i * 0.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🍁 Floating maple leaves */}
      {leaves.map((leaf, i) => (
        <motion.div
          key={leaf.id}
          className="absolute text-[#FF66B3] z-0 opacity-60"
          style={{
            left: `${leaf.x}px`,
            top: '-80px'
          }}
          custom={i}
          initial="initial"
          animate="animate"
          variants={leafVariants}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: `rotate(${leaf.rotateOffset}deg)` }}
          >
            <path d="M12,1L8,5H2L6,9L1,13L9,15L5,18L9,20L11,24L13,20L17,18L13,15L21,13L16,9L20,5H14L12,1Z" />
          </svg>
        </motion.div>
      ))}

      {/* Login form */}
      <motion.div
        className="max-w-md w-full mx-auto z-10 bg-[#1A0B2E]/90 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
      >
        <div className="flex flex-col items-center p-6">
          <motion.h1
            className="text-4xl font-bold text-[#A3F0E0] mb-8 relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            MushRoomLand Login
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FF66B3] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </motion.h1>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <label htmlFor="username" className="block text-white/90 mb-2">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white placeholder-[#A3F0E0]/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF66B3]"
                placeholder="Enter username"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <label htmlFor="password" className="block text-white/90 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white placeholder-[#A3F0E0]/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF66B3]"
                placeholder="Enter password"
                required
              />
            </motion.div>

            <motion.div
              className="flex flex-col space-y-4 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <PixelButton
                type="submit"
                variant="login"
                size="lg"
                className="w-full bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </PixelButton>

              <div className="text-center text-white/90 mt-4">
                <span>Don't have an account?</span>
                <motion.a
                  href="/register"
                  className="text-[#A3F0E0] ml-2 hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign Up
                </motion.a>
              </div>
            </motion.div>
          </form>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 text-white/80 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Community MushroomLand © 2025 - All rights reserved
      </motion.div>
    </motion.div>
  );
};

export default Login;
