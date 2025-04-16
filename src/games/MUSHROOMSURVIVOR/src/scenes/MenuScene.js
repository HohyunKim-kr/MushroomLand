export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('player', '/games/MUSHROOMSURVIVOR/assets/player11.png');
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x333333, 0x333333, 0x111111, 0x111111, 1);
        this.background = graphics.fillRect(0, 0, this.scale.width, this.scale.height)
            .setScrollFactor(0)
            .setDepth(0);

        const fontSizeTitle = Math.min(this.scale.width / 20, 48);
        const fontSizeButton = Math.min(this.scale.width / 30, 32);
        const fontSizeWeapons = Math.min(this.scale.width / 40, 20);

        this.titleText = this.add.text(centerX, centerY - 200, 'Survivor Game', {
            fontSize: `${fontSizeTitle}px`,
            color: '#fff',
        }).setOrigin(0.5).setDepth(1);

        this.startButton = this.add.text(centerX, centerY, 'Start Game', {
            fontSize: `${fontSizeButton}px`,
            color: '#0f0',
        }).setOrigin(0.5).setDepth(1).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        this.startButton.on('pointerover', () => this.startButton.setStyle({ color: '#ff0' }));
        this.startButton.on('pointerout', () => this.startButton.setStyle({ color: '#0f0' }));

        const unlockedWeapons = this.registry.get('unlockedWeapons') || ['bullet'];
        this.weaponsText = this.add.text(centerX, centerY + 100, `Unlocked Weapons: ${unlockedWeapons.join(', ')}`, {
            fontSize: `${fontSizeWeapons}px`,
            color: '#fff',
        }).setOrigin(0.5).setDepth(1);

        this.titleText.setAlpha(0);
        this.startButton.setAlpha(0);
        this.weaponsText.setAlpha(0);

        this.tweens.add({
            targets: [this.titleText, this.startButton, this.weaponsText],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay: (target, key, val, index) => index * 200,
        });

        this.scale.on('resize', this.resizeUI, this);
    }

    resizeUI(gameSize) {
        if (!this.cameras || !this.cameras.main) return;

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const fontSizeTitle = Math.min(this.scale.width / 20, 48);
        const fontSizeButton = Math.min(this.scale.width / 30, 32);
        const fontSizeWeapons = Math.min(this.scale.width / 40, 20);

        try {
            if (this.titleText) {
                this.titleText.setPosition(centerX, centerY - 200);
                this.titleText.setFontSize(fontSizeTitle);
            }
            if (this.startButton) {
                this.startButton.setPosition(centerX, centerY);
                this.startButton.setFontSize(fontSizeButton);
            }
            if (this.weaponsText) {
                this.weaponsText.setPosition(centerX, centerY + 100);
                this.weaponsText.setFontSize(fontSizeWeapons);
            }
        } catch (e) {
            console.warn('MenuScene resize error:', e);
        }
    }
}
