import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  // Recent posts mock data
  const recentPosts = [
    { id: 1, title: "Welcome to Community MushroomLand", author: "Admin", date: "2023-06-10" },
    { id: 2, title: "Getting Started with MapleStory U", author: "GameMaster", date: "2023-06-09" },
    { id: 3, title: "Community Event this Weekend", author: "EventCoordinator", date: "2023-06-08" }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2A1A3E] bg-starry-pattern bg-cover bg-center overflow-x-hidden">
      <NavBar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-16 px-4 min-h-[90vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 -z-10 bg-starry-pattern bg-cover bg-center opacity-20" />
        
        <motion.div
          className="container mx-auto text-center z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-[#A3F0E0] mb-6"
            variants={item}
          >
            Community 
            <span className="text-[#FF66B3]"> Spectra</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            variants={item}
          >
            A community-focused platform inspired by the nostalgic charm of MapleStory.
            Connect, share, and express yourself!
          </motion.p>
          
          <motion.div 
            className="mt-12 flex flex-wrap gap-4 justify-center"
            variants={item}
          >
            <PixelButton 
              variant="login" 
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
            >
              Join Now
            </PixelButton>
            
            <PixelButton 
              variant="primary" 
              size="lg"
              onClick={() => {
                const element = document.getElementById('community-feed');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
            >
              Explore Community
            </PixelButton>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#A3F0E0" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="opacity-70"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Community Feed Section */}
      <section 
        id="community-feed" 
        className="py-24 px-4 bg-gradient-to-b from-[#2A1A3E] to-[#1A0B2E]"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#A3F0E0] mb-4">Latest Community Activity</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Stay updated with the latest posts and activities from our community members.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-[#1A0B2E]/90 h-full flex flex-col p-6 rounded-lg border border-[#FF66B3]/50 shadow-[0_0_5px_rgba(255,102,179,0.2)] hover:shadow-[0_0_8px_rgba(255,102,179,0.4)] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#A3F0E0] text-sm">{post.date}</span>
                    <span className="text-white/60 text-xs">by {post.author}</span>
                  </div>
                  <h3 className="text-[#A3F0E0] text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-white/80 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum...
                  </p>
                  <div className="mt-auto">
                    <button className="text-[#FF66B3] text-sm hover:underline transition-all">
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <PixelButton 
              variant="secondary" 
              size="lg"
              className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
            >
              View All Posts
            </PixelButton>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-[#1A0B2E]/90 text-white/80">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-[#A3F0E0] transition-colors">Home</a>
            <a href="#" className="hover:text-[#A3F0E0] transition-colors">About</a>
            <a href="#" className="hover:text-[#A3F0E0] transition-colors">Community</a>
            <a href="#" className="hover:text-[#A3F0E0] transition-colors">Contact</a>
          </div>
          <p>© 2023 Community Spectra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;