// src/pages/GamePage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface Game {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  good: number;
  bad: number;
  url: string;
}

const GamePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [loading, setLoading] = useState(true);

  const categories = ['전체', '액션', '슈팅', '아케이드', '스포츠', '퍼즐보드', '전략/시뮬', '기타'];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockGames: Game[] = [
          {
            id: '1',
            title: '메이플 인내의 숲 점프 게임',
            category: '아케이드',
            thumbnail: 'https://placehold.co/200x150/2A1A3E/66E6CC?text=JumpGame',
            description: '메이플 인내의 숲 스타일 무한 점프 게임!',
            good: 150,
            bad: 20,
            url: './JumpGame',
          },
          {
            id: '2',
            title: '미니어쳐',
            category: '액션',
            thumbnail: 'https://placehold.co/200x150/2A1A3E/66E6CC?text=Miniature',
            description: '미니어쳐 캐릭터와 함께하는 액션 게임!',
            good: 120,
            bad: 30,
            url: '/games/miniature',
          },
          {
            id: '3',
            title: '바닐라 드릴6',
            category: '퍼즐보드',
            thumbnail: 'https://placehold.co/200x150/2A1A3E/66E6CC?text=VanillaDrill',
            description: '퍼즐을 풀며 드릴을 완성하세요.',
            good: 85,
            bad: 15,
            url: '/games/vanilladrill',
          },
          {
            id: '4',
            title: '스페이스',
            category: '슈팅',
            thumbnail: 'https://placehold.co/200x150/2A1A3E/66E6CC?text=Space',
            description: '우주를 배경으로 한 슈팅 게임!',
            good: 200,
            bad: 50,
            url: '/games/space',
          },
          {
            id: '5',
            title: 'Mushroom Survivor',
            category: '슈팅',
            thumbnail: 'https://placehold.co/200x150/2A1A3E/66E6CC?text=MushroomSurvivor',
            description: '버섯 캐릭터와 함께하는 생존 슈팅 게임!',
            good: 180,
            bad: 25,
            url: '/mushroomsurvivor', // MushroomSurvivorGame.tsx 경로
          },
        ];
        setGames(mockGames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        toast.error('Failed to load games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = selectedCategory === '전체'
    ? games
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90">
      <NavBar />
      <motion.div 
        className="flex-1 container mx-auto pt-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedCategory === category
                  ? 'bg-[#FF66B3] text-white border-[#66E6CC]'
                  : 'bg-[#2A1A3E]/90 text-white/80 border-[#FF66B3]/50 hover:bg-[#FF66B3]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
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
            filteredGames.map(game => (
              <Link to={game.url} key={game.id} className="hover-scale">
                <Card className="bg-[#1A0B2E]/90 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] hover:shadow-[0_0_8px_rgba(255,102,179,0.4)] transition-all">
                  <CardHeader>
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-32 object-cover rounded-t-md border-b-2 border-[#FF66B3]/50"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-[#66E6CC]">{game.title}</CardTitle>
                    <CardDescription className="text-white/80 line-clamp-2">{game.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="text-[#66E6CC]">Good: {game.good}</span>
                      <span className="text-[#FF66B3]">Bad: {game.bad}</span>
                    </div>
                    <PixelButton
                      variant="primary"
                      size="sm"
                      className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#66E6CC]"
                    >
                      Play
                    </PixelButton>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </motion.div>

        <div className="flex justify-center mb-10">
          <PixelButton
            variant="secondary"
            size="md"
            className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#66E6CC]"
          >
            More Games
          </PixelButton>
        </div>
      </motion.div>

      <footer className="bg-[#1A0B2E]/90 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/70">
            Community MushroomLand © 2025 - All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GamePage;