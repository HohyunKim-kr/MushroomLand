import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

const MainPage: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockPosts: Post[] = [
          {
            id: '1',
            title: 'Welcome to MushRoomland!',
            content: 'This is our brand new community platform inspired by MapleStory U...',
            author: 'Admin',
            date: '2023-07-15',
            imageUrl: 'https://placehold.co/600x400/2A1A3E/66E6CC?text=Welcome'
          },
          {
            id: '2',
            title: 'How to use the Dressroom',
            content: 'A guide on customizing your dashboard with our drag-and-drop tools...',
            author: 'Guide123',
            date: '2023-07-14'
          },
          {
            id: '3',
            title: 'Community Event This Weekend!',
            content: 'Join us for a special event this weekend with prizes and fun activities...',
            author: 'EventCoordinator',
            date: '2023-07-13',
            imageUrl: 'https://placehold.co/600x400/2A1A3E/66E6CC?text=Event'
          }
        ];
        setRecentPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        toast.error('Failed to load recent posts');
        setLoading(false);
      }
    };
    fetchRecentPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2A1A3E] bg-starry-pattern bg-cover bg-center">
      <NavBar />
      
      <motion.div 
        className="container mx-auto pt-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="p-6 mb-8 bg-[#2A1A3E]/90 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.3)] rounded-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-[#66E6CC] text-center mb-4">Welcome to Community MushroomLand</h1>
          <p className="text-white/90 text-center">A MapleStory-inspired community where you can connect, share, and explore!</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          <Link to="/bulletin" className="hover-scale">
            <Card className="bg-[#1A0B2E]/90 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] hover:shadow-[0_0_8px_rgba(255,102,179,0.4)] transition-all">
              <CardHeader>
                <CardTitle className="text-[#66E6CC]">Bulletin Board</CardTitle>
                <CardDescription className="text-white/80">View and share posts with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-[#2A1A3E]/60 rounded-md">
                  <svg className="w-16 h-16 text-[#66E6CC]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11z"/>
                  </svg>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <PixelButton 
                  variant="secondary" 
                  size="md" 
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#66E6CC]"
                >
                  Visit Board
                </PixelButton>
              </CardFooter>
            </Card>
          </Link>

          <Link to="/dressroom" className="hover-scale">
            <Card className="bg-[#1A0B2E]/90 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] hover:shadow-[0_0_8px_rgba(255,102,179,0.4)] transition-all">
              <CardHeader>
                <CardTitle className="text-[#66E6CC]">Dressroom</CardTitle>
                <CardDescription className="text-white/80">Customize your personal dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-[#2A1A3E]/60 rounded-md">
                  <svg className="w-16 h-16 text-[#66E6CC]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <PixelButton 
                  variant="primary" 
                  size="md" 
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#66E6CC]"
                >
                  Enter Dressroom
                </PixelButton>
              </CardFooter>
            </Card>
          </Link>

          <Link to="/login" className="hover-scale">
            <Card className="bg-[#1A0B2E]/90 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] hover:shadow-[0_0_8px_rgba(255,102,179,0.4)] transition-all">
              <CardHeader>
                <CardTitle className="text-[#66E6CC]">Account</CardTitle>
                <CardDescription className="text-white/80">Login or create an account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-[#2A1A3E]/60 rounded-md">
                  <svg className="w-16 h-16 text-[#66E6CC]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <PixelButton 
                  variant="login" 
                  size="md" 
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#66E6CC]"
                >
                  Login Now
                </PixelButton>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div
          className="p-6 mb-8 bg-[#2A1A3E]/90 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.3)] rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#66E6CC] mb-6">Recent Posts</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-[#FF66B3]/20 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-[#FF66B3]/20 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-[#FF66B3]/20 rounded"></div>
                    <div className="h-4 bg-[#FF66B3]/20 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-[#1A0B2E]/90 rounded-lg p-4 hover:bg-[#1A0B2E]/95 transition-colors border border-[#FF66B3]/50 shadow-[0_0_5px_rgba(255,102,179,0.2)]"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01, boxShadow: "0 0 8px rgba(255,102,179,0.4)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {post.imageUrl && (
                      <div className="md:w-1/4">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="rounded-md w-full h-32 md:h-24 object-cover border border-[#FF66B3]/50"
                        />
                      </div>
                    )}
                    <div className={post.imageUrl ? "md:w-3/4" : "w-full"}>
                      <Link to={`/bulletin/${post.id}`} className="story-link">
                        <h3 className="text-xl font-bold text-[#66E6CC] mb-2">{post.title}</h3>
                      </Link>
                      <p className="text-white/80 mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#FF66B3] font-bold">By {post.author}</span>
                        <span className="text-sm text-white/70">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="flex justify-center mt-6">
            <Link to="/bulletin">
              <PixelButton 
                variant="secondary" 
                size="md" 
                className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#66E6CC]"
              >
                View All Posts
              </PixelButton>
            </Link>
          </div>
        </motion.div>
      </motion.div>
      
      <footer className="bg-[#1A0B2E]/90 py-6 mt-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/70">
            Community MushroomLand © 2023 - All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;