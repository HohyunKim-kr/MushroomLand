import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setJwtToken } = useAuthStore();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setJwtToken('');
        setUser(null);
        localStorage.removeItem('jwtToken');
        navigate('/login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="bg-[#1A0B2E]/90 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <span>Community MushroomLand</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <button
            onClick={() => navigate('/bulletin')}
            className="text-white px-4 py-2 rounded-md hover:bg-[#FF66B3]/50"
          >
            Bulletin
          </button>
          <button
            onClick={() => navigate('/dressroom')}
            className="text-white px-4 py-2 rounded-md hover:bg-[#FF66B3]/50"
          >
            Dressroom
          </button>
          <button
            onClick={() => navigate('/game')} // or '/mushroomsurvivalgame' depending on which game you prefer
            className="text-white px-4 py-2 rounded-md hover:bg-[#FF66B3]/50"
          >
            Game
          </button>

          {/* User Authentication Section */}
          <div className="text-white">
            {user ? (
              <div className="flex items-center gap-4">
                <span>{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#FF66B3] text-white px-4 py-2 rounded-md"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-[#FF66B3] text-white px-4 py-2 rounded-md"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;