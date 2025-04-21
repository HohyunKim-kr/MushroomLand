// src/main.js
import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';
import MenuScene from './scenes/MenuScene.js';
import UnlockScene from './scenes/UnlockScene.js';
import UnlockModalScene from './scenes/UnlockModalScene.js';
import UpgradeModalScene from './scenes/UpgradeModalScene.js';

// 화면 크기에 맞게 width와 height 설정
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false },
    },
    scene: [MenuScene, GameScene, UnlockScene, UnlockModalScene, UpgradeModalScene],
    scale: {
        mode: Phaser.Scale.RESIZE, // 창 크기 변경에 따라 캔버스 크기 조정
        autoCenter: Phaser.Scale.CENTER_BOTH, // 캔버스를 화면 중앙에 배치
    },
};

const game = new Phaser.Game(config);

// 창 크기 변경 이벤트 리스너 추가
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});