import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PixelButton from '@/components/PixelButton';
import { FaGoogle } from 'react-icons/fa'; // 구글 아이콘 임포트

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 구글 로그인 리디렉션 처리
  const handleGoogleLogin = async () => {
    // 백엔드에서 구글 인증 요청 URL을 받아옴
    // 백엔드에 요청
    const response = await fetch('http://localhost:5000/api/auth/google');
    const data = await response.json();

    // 구글 로그인 페이지로 리디렉션
    window.location.href = data.authUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    // 로그인 처리 로직
    setIsLoading(false);
    navigate('/');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🍁 Floating maple leaves */}
      {/* Other animations and content here... */}

      {/* 기본 로그인 폼 */}
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
            {/* Logo/Underline animation */}
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

              {/* Google Login Button */}
              <PixelButton
                type="button"
                variant="login"
                size="lg"
                className="w-full bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0] flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
              >
                <FaGoogle size={24} /> {/* Google 아이콘 추가 */}
                Login with Google
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
