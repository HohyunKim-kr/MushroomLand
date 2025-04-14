// src/scenes/UnlockModalScene.js
export default class UnlockModalScene extends Phaser.Scene {
    constructor() {
        super('UnlockModalScene');
    }

    init(data) {
        this.message = data.message || 'Unlocked!';
    }

    create() {
        this.scene.bringToTop();
        this.scene.setVisible(true);

        const panel = this.add.rectangle(400, 300, 400, 200, 0x333333).setScrollFactor(0).setDepth(1000);
        const text = this.add.text(400, 260, this.message, {
            fontSize: '32px',
            color: '#0f0',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        const confirmButton = this.add.text(400, 340, '확인', {
            fontSize: '24px',
            color: '#fff',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setInteractive();

        confirmButton.on('pointerdown', () => {
            panel.destroy();
            text.destroy();
            confirmButton.destroy();
            this.scene.stop();
            this.scene.resume('GameScene');
        });

        confirmButton.on('pointerover', () => confirmButton.setStyle({ color: '#0f0' }));
        confirmButton.on('pointerout', () => confirmButton.setStyle({ color: '#fff' }));
    }
}