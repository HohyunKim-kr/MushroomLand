import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';
import useAuth from '@/hooks/useAuth';

interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
}

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setPost({
          id: postId,
          title: `Post #${postId} Title`,
          content: `This is the content of post #${postId}. It's a detailed view of this post with all its content displayed here. This is a sample post to demonstrate the post detail page functionality.`,
          author: 'MapleUser123',
          date: '2025-04-04',
          imageUrl: Math.random() > 0.5 ? 'https://placehold.co/800x400/2A1A3E/A3F0E0?text=Post+Image' : undefined
        });
        
        setComments([
          {
            id: '1',
            content: 'Great post! Thanks for sharing this information.',
            author: 'Commenter1',
            date: '2025-04-04'
          },
          {
            id: '2',
            content: 'I have a question about this. Can you provide more details?',
            author: 'Commenter2',
            date: '2025-04-04'
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        toast.error('Failed to load post');
        navigate('/bulletin');
      }
    };

    fetchPostDetails();
  }, [postId, navigate]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newCommentObj = {
        id: Math.random().toString(36).substring(2, 9),
        content: newComment,
        author: user ? user.username : 'Guest',
        date: new Date().toISOString().split('T')[0]
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Post deleted successfully!');
      navigate('/bulletin');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90">
        <NavBar />
        <div className="container mx-auto pt-24 px-4">
          <div className="bg-[#1A0B2E]/90 p-6 max-w-4xl mx-auto border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-[#FF66B3]/20 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-[#FF66B3]/20 rounded w-1/2 mx-auto"></div>
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-[#FF66B3]/20 rounded"></div>
                <div className="h-4 bg-[#FF66B3]/20 rounded"></div>
                <div className="h-4 bg-[#FF66B3]/20 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          className="bg-[#1A0B2E]/90 p-6 mb-8 max-w-4xl mx-auto border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="mb-6 flex justify-between items-center">
            <Link to="/bulletin" className="text-[#A3F0E0] hover:underline">
              ← Back to Bulletin Board
            </Link>
            
            {user && user.username === post.author && (
              <div className="flex gap-2">
                <Link to={`/bulletin/edit/${postId}`}>
                  <PixelButton 
                    variant="secondary" 
                    size="sm" 
                    className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                  >
                    Edit
                  </PixelButton>
                </Link>
                <PixelButton 
                  variant="secondary" 
                  size="sm" 
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                  onClick={handleDelete}
                >
                  Delete
                </PixelButton>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-[#A3F0E0] mb-4">{post.title}</h1>
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-[#FF66B3] font-bold">By {post.author}</span>
            <span className="text-white/60">{post.date}</span>
          </div>
          
          {post.imageUrl && (
            <div className="mb-6">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="rounded-md w-full h-auto max-h-[400px] object-cover border border-[#FF66B3]/50"
              />
            </div>
          )}
          
          <div className="text-white/90 mb-8 whitespace-pre-line">
            {post.content}
          </div>
          
          <div className="border-t border-[#FF66B3]/50 pt-6">
            <h2 className="text-2xl font-bold text-[#A3F0E0] mb-6">Comments ({comments.length})</h2>
            
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white placeholder-[#A3F0E0]/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF66B3]"
                  placeholder="Write a comment..."
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end">
                <PixelButton
                  type="submit"
                  variant="secondary"
                  size="md"
                  className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                  disabled={submitting}
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </PixelButton>
              </div>
            </form>
            
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className="bg-[#2A1A3E]/60 p-4 rounded-md border border-[#FF66B3]/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#FF66B3] font-bold">{comment.author}</span>
                      <span className="text-white/60 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-white/90">{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/60 py-4">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostDetail;