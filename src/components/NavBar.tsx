import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setJwtToken } = useAuthStore();

  const handleLogout = async () => {
    try {
      // 백엔드로 로그아웃 요청 보내기 (fetch 사용)
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // 상태 초기화 (JWT 토큰과 사용자 정보 초기화)
        setJwtToken('');
        setUser(null);

        // localStorage에서 JWT 토큰 삭제
        localStorage.removeItem('jwtToken');

        // 로그아웃 후 로그인 페이지로 리디렉션
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
  );
};

export default NavBar;
