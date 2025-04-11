import { create } from 'zustand';

// user의 타입을 명확히 정의
interface User {
  userId: string;
  email: string;
  name?: string;
  picture?: string;
}

interface AuthState {
  jwtToken: string | null;
  user: User | null; // user의 타입을 User로 변경
  setJwtToken: (token: string | null) => void;
  setUser: (user: User) => void; // setUser의 타입을 User로 지정
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  jwtToken: null,
  user: null,
  setJwtToken: (token) => set({ jwtToken: token }),
  setUser: (user) => set({ user }), // user는 User 타입
  clearAuth: () => set({ jwtToken: null, user: null }),
}));
