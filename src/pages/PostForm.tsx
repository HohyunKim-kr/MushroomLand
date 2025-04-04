import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';

const PostForm = () => {
  const { postId } = useParams();
  const isEditing = !!postId;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);

  useEffect(() => {
    // If we're editing, fetch the existing post data
    if (isEditing) {
      const fetchPost = async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock data for editing
          setTitle(`Post #${postId} Title`);
          setContent(`This is the content of post #${postId}. It's a sample content for editing demonstration.`);
          setLoadingPost(false);
        } catch (error) {
          console.error('Error fetching post:', error);
          toast.error('Failed to load post data');
          navigate('/bulletin');
        }
      };
      
      fetchPost();
    }
  }, [postId, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      navigate('/bulletin');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90">
      <NavBar />
      
      <motion.div 
        className="container mx-auto pt-24 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="bg-[#1A0B2E]/90 p-6 mb-8 max-w-3xl mx-auto border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-[#A3F0E0] text-center mb-8">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          
          {loadingPost ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-[#FF66B3]/20 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-24 bg-[#FF66B3]/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-white/90 mb-2">
                  Title <span className="text-[#FF66B3]">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white placeholder-[#A3F0E0]/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF66B3]"
                  placeholder="Enter post title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-white/90 mb-2">
                  Content <span className="text-[#FF66B3]">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white placeholder-[#A3F0E0]/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF66B3] min-h-[200px]"
                  placeholder="Enter post content"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <PixelButton
                  type="button"
                  variant="secondary"
                  size="md"
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                  onClick={() => navigate('/bulletin')}
                >
                  Cancel
                </PixelButton>
                
                <PixelButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                  disabled={isLoading}
                >
                  {isLoading ? (isEditing ? 'Updating...' : 'Posting...') : (isEditing ? 'Update Post' : 'Create Post')}
                </PixelButton>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostForm;