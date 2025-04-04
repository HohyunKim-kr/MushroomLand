// src/components/Intro.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  // 3초 후 강제로 onComplete 호출 (애니메이션 실패 시 대비)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3초 후 강제 전환

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#1A0B2E] z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* 스프라이트 애니메이션 스타일 정의 */}
      <style>
        {`
          .mushroom-sprite {
            width: 135px;
            height: 141px;
            background-image: url('/pngegg.png'); /* 스프라이트 이미지 경로 */
            background-size: 675px 141px; /* 5프레임 * 135px = 675px */
            background-position: 0 0;
            background-repeat: no-repeat;
            image-rendering: pixelated; /* 픽셀 아트 스타일 */
            animation: spriteAnimation 0.5s steps(5) infinite; /* 5프레임, 0.5초 주기 */
          }

          @keyframes spriteAnimation {
            from {
              background-position: 0 0;
            }
            to {
              background-position: -675px 0; /* 5프레임 이동 */
            }
          }

          .pixel-font {
            font-family: 'Press Start 2P', cursive; /* 픽셀 폰트 */
          }
        `}
      </style>

      {/* 몬스터 애니메이션 (스프라이트 + framer-motion) */}
      <motion.div
        className="mushroom-sprite"
        initial={{ y: 300, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 100, damping: 10 },
        }}
        exit={{ y: -300, opacity: 0 }}
      />

      {/* MushRoomLand 텍스트 */}
      <motion.h1
        className="text-5xl font-bold text-[#66E6CC] mt-8 pixel-font"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 1 } }}
        exit={{ opacity: 0, scale: 1.5 }}
      >
        MushRoomLand
      </motion.h1>
    </motion.div>
  );
};

export default Intro;
