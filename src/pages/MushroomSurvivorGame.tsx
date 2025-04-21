import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import NavBar from "@/components/NavBar";
import GameScene from "../games/MUSHROOMSURVIVOR/src/scenes/GameScene";
import MenuScene from "../games/MUSHROOMSURVIVOR/src/scenes/MenuScene";
import UnlockScene from "../games/MUSHROOMSURVIVOR/src/scenes/UnlockScene";
import UnlockModalScene from "../games/MUSHROOMSURVIVOR/src/scenes/UnlockModalScene";
import UpgradeModalScene from "../games/MUSHROOMSURVIVOR/src/scenes/UpgradeModalScene";

const MushroomSurvivorGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current && !gameInstance.current) {
      const updateCanvasSize = () => {
        if (gameRef.current) {
          return {
            width: gameRef.current.clientWidth,
            height: gameRef.current.clientHeight,
          };
        }
        return { width: window.innerWidth, height: window.innerHeight - 60 }; // NavBar 높이 고려
      };

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current,
        scale: {
          mode: Phaser.Scale.RESIZE, // 창 크기에 맞춰 리사이즈
          autoCenter: Phaser.Scale.CENTER_BOTH, // 캔버스 중앙 정렬
          width: updateCanvasSize().width, // 초기 너비
          height: updateCanvasSize().height, // 초기 높이
        },
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: [
          MenuScene,
          GameScene,
          UnlockScene,
          UnlockModalScene,
          UpgradeModalScene,
        ],
      };

      gameInstance.current = new Phaser.Game(config);

      const handleResize = () => {
        if (gameInstance.current && gameRef.current) {
          const { width, height } = updateCanvasSize();
          // Phaser 캔버스 크기 조정
          gameInstance.current.scale.resize(width, height);
          // 부모 컨테이너 크기와 동기화
          gameRef.current.style.width = `${width}px`;
          gameRef.current.style.height = `${height}px`;
          // 모든 씬에 크기 조정 이벤트 전파
          gameInstance.current.scene.scenes.forEach((scene) => {
            scene.scale?.emit?.("resize", { width, height });
          });
        }
      };

      // 초기 크기 설정
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (gameInstance.current) {
          gameInstance.current.destroy(true);
          gameInstance.current = null;
        }
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-mp-background bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-b from-[#1A0B2E]/90 to-[#2A1A3E]/90">
      <NavBar />
      <div className="flex-1">
        <div
          ref={gameRef}
          style={{
            width: "100%",
            height: "calc(100vh - 60px)", // NavBar 높이 고려
            maxHeight: "calc(100vh - 60px)",
            overflow: "hidden",
          }}
        />
      </div>
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

export default MushroomSurvivorGame;