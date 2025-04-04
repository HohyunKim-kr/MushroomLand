import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: number;
  imageUrl?: string;
}

const BulletinBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        const mockPosts: Post[] = Array.from({ length: 12 }, (_, i) => ({
          id: (i + 1).toString(),
          title: `Post #${i + 1} Title - ${['News', 'Guide', 'Discussion', 'Art', 'Event'][Math.floor(Math.random() * 5)]}`,
          content: `This is the content preview for post #${i + 1}. Click to read more...`,
          author: `User${Math.floor(Math.random() * 100) + 1}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          comments: Math.floor(Math.random() * 20),
          imageUrl: Math.random() > 0.7 ? `https://placehold.co/300x200/2A1A3E/A3F0E0?text=Post+${i + 1}` : undefined
        }));
        setPosts(mockPosts);
        setFilteredPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  return (
    <div className="min-h-[100dvh] bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90">
      <NavBar />
      
      <motion.div 
        className="container mx-auto pt-24 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="p-6 mb-8 bg-[#1A0B2E]/90 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#A3F0E0] mb-4 md:mb-0">Bulletin Board</h1>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white placeholder-[#A3F0E0]/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF66B3]"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A3F0E0]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              
              <Link to="/bulletin/new">
                <PixelButton variant="primary" size="md">
                  New Post
                </PixelButton>
              </Link>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-[#2A1A3E]/30 rounded-lg p-4">
                  <div className="flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-[#FF66B3]/20 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-[#FF66B3]/20 rounded"></div>
                        <div className="h-4 bg-[#FF66B3]/20 rounded w-5/6"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-[#FF66B3]/20 rounded w-20"></div>
                        <div className="h-3 bg-[#FF66B3]/20 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-[#1A0B2E]/90 hover:bg-[#1A0B2E]/95 transition-colors rounded-lg p-4 border border-[#FF66B3]/50 shadow-[0_0_5px_rgba(255,102,179,0.2)]"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01, boxShadow: "0 0 10px rgba(255,102,179,0.4)" }}
                >
                  <Link to={`/bulletin/${post.id}`} className="flex flex-col md:flex-row gap-4">
                    {post.imageUrl && (
                      <div className="md:w-1/4 lg:w-1/5">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-32 object-cover rounded-md border border-[#FF66B3]/50"
                        />
                      </div>
                    )}
                    <div className={post.imageUrl ? "md:w-3/4 lg:w-4/5" : "w-full"}>
                      <h2 className="text-xl font-bold text-[#A3F0E0] mb-2">{post.title}</h2>
                      <p className="text-white/80 mb-4 line-clamp-2">{post.content}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#FF66B3] font-bold">By {post.author}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-white/60">{post.comments} {post.comments === 1 ? 'comment' : 'comments'}</span>
                          <span className="text-white/60">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-white/90 text-xl mb-4">No posts found matching your search.</p>
              {searchTerm && (
                <PixelButton 
                  variant="secondary" 
                  size="md" 
                  onClick={() => setSearchTerm('')} 
                >
                  Clear Search
                </PixelButton>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BulletinBoard;