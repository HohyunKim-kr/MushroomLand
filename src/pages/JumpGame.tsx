import React, { useEffect, useRef, useState } from 'react';

const JumpGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  const posXRef = useRef(0);
  const posYRef = useRef(0);
  const velocityYRef = useRef(0);
  const isJumpingRef = useRef(false);
  const keysPressedRef = useRef<Record<string, boolean>>({});
  const isFlippedRef = useRef(false);
  const lastPlatformIdRef = useRef("");
  const platformCountRef = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const debugModeRef = useRef(false); // 디버깅 모드 비활성화
  const highestPlatformYRef = useRef<number>(0);
  const cameraYRef = useRef<number>(0); // 카메라 위치 추가

  const characterWidth = 50;
  const characterHeight = 70;
  const platformWidth = 150;
  const platformHeight = 20;
  const movementSpeed = 5;
  const gravity = 0.4;
  const jumpPower = -14;
  const platformGapMin = 100;
  const platformGapMax = 150;
  const collisionBuffer = 5;

  const createPlatform = (y: number, x: number | null = null): HTMLElement => {
    if (!containerRef.current) return {} as HTMLElement;

    const platform = document.createElement('div');
    platform.className = 'absolute rounded-md z-10';
    platform.style.width = `${platformWidth}px`;
    platform.style.height = `${platformHeight}px`;
    platform.style.backgroundColor = '#388e3c'; // 고정 색상
    platform.style.border = '2px solid blue';

    const id = `platform-${platformCountRef.current++}`;
    platform.id = id;
    platform.dataset.id = id;

    const left = x !== null ? x : Math.random() * (window.innerWidth - platformWidth - 20) + 10;
    platform.style.left = `${left}px`;
    platform.style.top = `${y}px`;

    containerRef.current.appendChild(platform);
    return platform;
  };

  const initializePlatforms = () => {
    if (!containerRef.current) return;

    const existingPlatforms = containerRef.current.querySelectorAll('div[data-id^="platform-"]');
    existingPlatforms.forEach(platform => platform.remove());

    platformCountRef.current = 0;

    const firstPlatformY = window.innerHeight - 100;
    const firstPlatformX = (window.innerWidth - platformWidth) / 2;
    createPlatform(firstPlatformY, firstPlatformX);

    posXRef.current = firstPlatformX + (platformWidth - characterWidth) / 2;
    posYRef.current = firstPlatformY - characterHeight;
    lastPlatformIdRef.current = "platform-0";
    velocityYRef.current = 0;
    highestPlatformYRef.current = firstPlatformY;
    cameraYRef.current = 0;

    let currentY = firstPlatformY;
    let lastX = firstPlatformX;
    for (let i = 0; i < 15; i++) {
      currentY -= platformGapMin + Math.random() * (platformGapMax - platformGapMin);
      const maxHorizontalDistance = 200;
      const minX = Math.max(0, lastX - maxHorizontalDistance);
      const maxX = Math.min(window.innerWidth - platformWidth, lastX + maxHorizontalDistance);
      const newX = Math.min(maxX, Math.max(minX, lastX - 100 + Math.random() * 200));
      createPlatform(currentY, newX);
      lastX = newX;
      highestPlatformYRef.current = Math.min(highestPlatformYRef.current, currentY);
    }

    setGameActive(true);
    if (characterRef.current) {
      characterRef.current.style.left = `${posXRef.current}px`;
      characterRef.current.style.top = `${posYRef.current - cameraYRef.current}px`;
    }
  };

  const generateNewPlatform = () => {
    if (!containerRef.current) return;

    const platforms = containerRef.current.querySelectorAll('div[data-id^="platform-"]');
    if (platforms.length > 20) {
      const oldestPlatform = platforms[platforms.length - 1];
      oldestPlatform.remove();
    }

    const newY = highestPlatformYRef.current - (platformGapMin + Math.random() * (platformGapMax - platformGapMin));
    const maxHorizontalDistance = 200;
    const lastPlatform = platforms[0];
    const lastX = lastPlatform ? parseFloat(lastPlatform.style.left) : (window.innerWidth - platformWidth) / 2;
    const minX = Math.max(0, lastX - maxHorizontalDistance);
    const maxX = Math.min(window.innerWidth - platformWidth, lastX + maxHorizontalDistance);
    const newX = Math.min(maxX, Math.max(minX, lastX - 100 + Math.random() * 200));
    
    createPlatform(newY, newX);
    highestPlatformYRef.current = newY;
  };

  const gameLoop = (timestamp: number) => {
    if (!characterRef.current || !containerRef.current || !gameActive) return;

    const deltaTime = !lastTimeRef.current ? 1 : Math.min((timestamp - lastTimeRef.current) / 16.67, 2);
    lastTimeRef.current = timestamp;

    // 수평 이동
    if (keysPressedRef.current['a'] || keysPressedRef.current['arrowleft']) {
      posXRef.current -= movementSpeed * deltaTime;
      isFlippedRef.current = false;
    }
    if (keysPressedRef.current['d'] || keysPressedRef.current['arrowright']) {
      posXRef.current += movementSpeed * deltaTime;
      isFlippedRef.current = true;
    }
    posXRef.current = Math.max(0, Math.min(window.innerWidth - characterWidth, posXRef.current));

    // 수직 이동
    velocityYRef.current += gravity * deltaTime;
    const nextPosY = posYRef.current + velocityYRef.current * deltaTime;

    // 카메라 이동: 캐릭터가 화면 상단 1/3 이상 올라가면 카메라 이동
    if (nextPosY - cameraYRef.current < window.innerHeight / 3) {
      cameraYRef.current = Math.max(0, nextPosY - window.innerHeight / 3);
      generateNewPlatform(); // 새 플랫폼 생성
    }

    // 플랫폼 충돌 감지
    const platforms = containerRef.current.querySelectorAll('div[data-id^="platform-"]');
    const charRect = {
      left: posXRef.current,
      right: posXRef.current + characterWidth,
      top: nextPosY,
      bottom: nextPosY + characterHeight - collisionBuffer
    };

    let onPlatform = false;
    let currentPlatformId = "";

    platforms.forEach((platform) => {
      const platformY = parseFloat(platform.style.top);
      const relativePlatformRect = {
        left: parseFloat(platform.style.left),
        right: parseFloat(platform.style.left) + platformWidth,
        top: platformY,
        bottom: platformY + platformHeight
      };

      if (
        charRect.right > relativePlatformRect.left &&
        charRect.left < relativePlatformRect.right &&
        charRect.bottom >= relativePlatformRect.top &&
        charRect.top < relativePlatformRect.bottom &&
        velocityYRef.current >= 0
      ) {
        posYRef.current = relativePlatformRect.top - characterHeight;
        velocityYRef.current = 0;
        isJumpingRef.current = false;
        onPlatform = true;
        currentPlatformId = platform.dataset.id || "";

        if (currentPlatformId !== lastPlatformIdRef.current) {
          lastPlatformIdRef.current = currentPlatformId;
          setScore(prevScore => prevScore + 1);
        }
      }
    });

    if (!onPlatform) {
      posYRef.current = nextPosY;
    }

    if (posYRef.current - cameraYRef.current > window.innerHeight) {
      setGameActive(false);
      setTimeout(() => {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
      }, 100);
      return;
    }

    // 카메라에 따른 위치 업데이트
    if (characterRef.current) {
      characterRef.current.style.left = `${posXRef.current}px`;
      characterRef.current.style.top = `${posYRef.current - cameraYRef.current}px`;
    }
    platforms.forEach(platform => {
      platform.style.top = `${parseFloat(platform.style.top) - cameraYRef.current}px`;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const resetGame = () => {
    velocityYRef.current = 0;
    isJumpingRef.current = false;
    keysPressedRef.current = {};
    lastPlatformIdRef.current = "";
    lastTimeRef.current = 0;
    cameraYRef.current = 0;
    setScore(0);
    initializePlatforms();
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressedRef.current[event.key.toLowerCase()] = true;
      if ((event.key === ' ' || event.key.toLowerCase() === 'w' || event.key.toLowerCase() === 'arrowup') && !isJumpingRef.current) {
        velocityYRef.current = jumpPower;
        isJumpingRef.current = true;
      }
      event.preventDefault();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      delete keysPressedRef.current[event.key.toLowerCase()];
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    initializePlatforms();
    lastTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen bg-blue-100 overflow-hidden relative"
    >
      <div
        ref={characterRef}
        className="absolute bg-red-500 rounded-lg z-20"
        style={{
          width: `${characterWidth}px`,
          height: `${characterHeight}px`,
          border: '2px solid blue'
        }}
      ></div>
      <div className="fixed top-4 right-4 text-white text-2xl font-bold bg-black/70 px-4 py-2 rounded z-30">
        Score: {score}
      </div>
    </div>
  );
};

export default JumpGame;