// src/scenes/MenuScene.js
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('player', '/games/MUSHROOMSURVIVOR/assets/player.png');
    }

    create() {
        const centerX = this.game.scale.width / 2;
        const centerY = this.game.scale.height / 2;
        const width = this.game.scale.width;
        const height = this.game.scale.height;

        // 배경: 그라디언트 효과
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x333333, 0x333333, 0x111111, 0x111111, 1);
        this.background = graphics.fillRect(0, 0, width, height)
            .setScrollFactor(0)
            .setDepth(0);

        // 반응형 폰트 크기
        const fontSizeTitle = Math.min(this.game.scale.width / 20, 48);
        const fontSizeButton = Math.min(this.game.scale.width / 30, 32);
        const fontSizeWeapons = Math.min(this.game.scale.width / 40, 20);

        // 타이틀 텍스트
        this.titleText = this.add.text(centerX, centerY - 200, 'Survivor Game', {
            fontSize: `${fontSizeTitle}px`,
            color: '#fff',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1);

        // 시작 버튼
        this.startButton = this.add.text(centerX, centerY, 'Start Game', {
            fontSize: `${fontSizeButton}px`,
            color: '#0f0',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        this.startButton.on('pointerover', () => this.startButton.setStyle({ color: '#ff0' }));
        this.startButton.on('pointerout', () => this.startButton.setStyle({ color: '#0f0' }));

        // 해금된 무기 표시
        const unlockedWeapons = this.registry.get('unlockedWeapons') || ['bullet'];
        this.weaponsText = this.add.text(centerX, centerY + 100, `Unlocked Weapons: ${unlockedWeapons.join(', ')}`, {
            fontSize: `${fontSizeWeapons}px`,
            color: '#fff',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1);

        // 페이드인 애니메이션
        this.titleText.setAlpha(0);
        this.startButton.setAlpha(0);
        this.weaponsText.setAlpha(0);

        this.tweens.add({
            targets: [this.titleText, this.startButton, this.weaponsText],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay: (target, targetKey, value, targetIndex) => targetIndex * 200,
        });

        // 창 크기 변경 이벤트
        this.scale.on('resize', this.resizeUI, this);
    }

    resizeUI(gameSize) {
        const centerX = this.game.scale.width / 2;
        const centerY = this.game.scale.height / 2;
        const width = this.game.scale.width;
        const height = this.game.scale.height;

        const fontSizeTitle = Math.min(this.game.scale.width / 20, 48);
        const fontSizeButton = Math.min(this.game.scale.width / 30, 32);
        const fontSizeWeapons = Math.min(this.game.scale.width / 40, 20);

        // 배경 크기 조정
        this.background.clear();
        this.background.fillGradientStyle(0x333333, 0x333333, 0x111111, 0x111111, 1);
        this.background.fillRect(0, 0, width, height);

        // UI 요소 위치 및 크기 조정
        this.titleText.setPosition(centerX, centerY - 200);
        this.titleText.setFontSize(fontSizeTitle);

        this.startButton.setPosition(centerX, centerY);
        this.startButton.setFontSize(fontSizeButton);

        this.weaponsText.setPosition(centerX, centerY + 100);
        this.weaponsText.setFontSize(fontSizeWeapons);
    }
}