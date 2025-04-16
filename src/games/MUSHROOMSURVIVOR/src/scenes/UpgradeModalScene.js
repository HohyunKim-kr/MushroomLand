export default class UpgradeModalScene extends Phaser.Scene {
    constructor() {
        super('UpgradeModalScene');
    }

    init(data) {
        this.gameScene = data.gameScene;
    }

    create() {
        this.scene.bringToTop();
        this.scene.setVisible(true);

        const camera = this.cameras.main;
        const centerX = camera.midPoint.x;
        const centerY = camera.midPoint.y;

        const panelHeight = 420;
        const panel = this.add.rectangle(centerX, centerY, 500, panelHeight, 0x333333)
            .setScrollFactor(0)
            .setDepth(1000);

        this.add.text(centerX, centerY - 150, '업그레이드 선택', {
            fontSize: '32px',
            color: '#fff',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        const upgrades = [
            { name: '공격력 기회', effect: 'damage', value: 0.2, desc: '공격력이 20% 증가합니다.' },
            { name: '속도 돌진', effect: 'speed', value: 40, desc: '이동 속도가 40 증가합니다.' },
            { name: '포세이돈의 지원', effect: 'health', value: 2, desc: '체력이 2 증가합니다.' },
        ];

        const buttons = [];
        upgrades.forEach((upgrade, i) => {
            const y = centerY - 100 + i * 60;
            const btn = this.add.text(centerX, y, `${upgrade.name}: ${upgrade.desc}`, {
                fontSize: '20px',
                color: '#0f0',
                fontStyle: 'bold',
                backgroundColor: '#222222',
                padding: { x: 10, y: 5 },
            }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setInteractive();

            btn.on('pointerdown', () => {
                const message = this.add.text(centerX, centerY + 180, `선택됨: ${upgrade.name}`, {
                    fontSize: '24px',
                    color: '#ff0',
                }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);

                this.gameScene.playerStats.applyUpgrade(upgrade.effect, upgrade.value);

                this.time.delayedCall(2000, () => {
                    message.destroy();
                    buttons.forEach(b => b.destroy());
                    panel.destroy();
                    skipButton.destroy();
                    this.scene.stop();
                    this.scene.resume('GameScene'); // 🔥 핵심 수정
                });
            });

            btn.on('pointerover', () => btn.setStyle({ color: '#ff0' }));
            btn.on('pointerout', () => btn.setStyle({ color: '#0f0' }));

            buttons.push(btn);
        });

        const skipButton = this.add.text(centerX, centerY + 120, '무시', {
            fontSize: '20px',
            color: '#f00',
            fontStyle: 'bold',
            backgroundColor: '#222222',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setInteractive();

        skipButton.on('pointerdown', () => {
            const message = this.add.text(centerX, centerY + 180, '업그레이드 무시됨', {
                fontSize: '24px',
                color: '#ff0',
            }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);

            this.time.delayedCall(2000, () => {
                message.destroy();
                buttons.forEach(b => b.destroy());
                panel.destroy();
                skipButton.destroy();
                this.scene.stop();
                this.scene.resume('GameScene'); // 🔥 핵심 수정
            });
        });

        skipButton.on('pointerover', () => skipButton.setStyle({ color: '#ff0' }));
        skipButton.on('pointerout', () => skipButton.setStyle({ color: '#f00' }));

        this.scale.on('resize', this.resizeUI, this);
    }

    resizeUI(gameSize) {
        if (!this.cameras || !this.cameras.main) return;

        const centerX = this.cameras.main.midPoint.x;
        const centerY = this.cameras.main.midPoint.y;

        this.children.list.forEach(child => {
            if (!child || !child.setPosition) return;

            if (child instanceof Phaser.GameObjects.Rectangle) {
                child.setPosition(centerX, centerY);
            } else if (child instanceof Phaser.GameObjects.Text) {
                try {
                    if (child.text === '업그레이드 선택') {
                        child.setPosition(centerX, centerY - 150);
                    } else if (child.text === '무시') {
                        child.setPosition(centerX, centerY + 120);
                    } else if (child.text.startsWith('선택됨:') || child.text === '업그레이드 무시됨') {
                        child.setPosition(centerX, centerY + 180);
                    } else {
                        const index = Math.floor((child.y - (centerY - 100)) / 60);
                        child.setPosition(centerX, centerY - 100 + index * 60);
                    }
                } catch (e) {
                    console.warn('resizeUI error on text:', e);
                }
            }
        });
    }
}
