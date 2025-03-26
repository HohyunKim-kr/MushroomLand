import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PixelButton from "@/components/PixelButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A0B2E] to-[#2A1A3E] bg-starry-pattern bg-cover bg-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center bg-[#1A0B2E]/90 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg p-8 max-w-md w-full mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
      >
        <motion.h1 
          className="text-6xl font-bold text-[#A3F0E0] mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          404
        </motion.h1>
        <motion.p 
          className="text-xl text-white/80 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Oops! Page not found
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <PixelButton
            variant="primary"
            size="lg"
            className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
            onClick={() => window.location.href = "/"}
          >
            Return to Home
          </PixelButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;