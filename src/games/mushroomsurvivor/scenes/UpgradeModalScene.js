export default class UpgradeModalScene extends Phaser.Scene {
  constructor() {
    super("UpgradeModalScene");
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
    const panel = this.add
      .rectangle(centerX, centerY, 500, panelHeight, 0x333333)
      .setScrollFactor(0)
      .setDepth(1000);

    const title = this.add
      .text(centerX, centerY - 150, "Upgrade", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001);
    title.setData("type", "title");

    const upgrades = [
      {
        name: "attack",
        effect: "damage",
        value: 0.2,
        desc: "attack 20% Increase",
      },
      {
        name: "Speed",
        effect: "speed",
        value: 40,
        desc: "Speed Up 40",
      },
      {
        name: "health",
        effect: "health",
        value: 2,
        desc: "health up 2",
      },
    ];

    const buttons = [];

    upgrades.forEach((upgrade, i) => {
      const y = centerY - 100 + i * 60;
      const btn = this.add
        .text(centerX, y, `${upgrade.name}: ${upgrade.desc}`, {
          fontSize: "20px",
          color: "#0f0",
          fontStyle: "bold",
          backgroundColor: "#222222",
          padding: { x: 10, y: 5 },
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001)
        .setInteractive();

      btn.setData("index", i);
      btn.setData("type", "upgrade");

      btn.on("pointerdown", () => {
        // 🔒 중복 클릭 방지
        buttons.forEach((b) => {
          b.disableInteractive();
          b.setAlpha(0.5);
        });
        skipButton.disableInteractive();
        skipButton.setAlpha(0.5);

        const message = this.add
          .text(centerX, centerY + 180, `selected: ${upgrade.name}`, {
            fontSize: "24px",
            color: "#ff0",
          })
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(1002);
        message.setData("type", "message");

        this.gameScene.playerStats.applyUpgrade(upgrade.effect, upgrade.value);

        this.time.delayedCall(1000, () => {
          message.destroy();
          buttons.forEach((b) => b.destroy());
          panel.destroy();
          skipButton.destroy();
          this.scene.stop();
          this.scene.resume("GameScene");
        });
      });

      btn.on("pointerover", () => btn.setStyle({ color: "#ff0" }));
      btn.on("pointerout", () => btn.setStyle({ color: "#0f0" }));

      buttons.push(btn);
    });

    const skipButton = this.add
      .text(centerX, centerY + 120, "무시", {
        fontSize: "20px",
        color: "#f00",
        fontStyle: "bold",
        backgroundColor: "#222222",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001)
      .setInteractive();

    skipButton.setData("type", "skip");

    skipButton.on("pointerdown", () => {
      buttons.forEach((b) => {
        b.disableInteractive();
        b.setAlpha(0.5);
      });
      skipButton.disableInteractive();
      skipButton.setAlpha(0.5);

      const message = this.add
        .text(centerX, centerY + 180, "업그레이드 무시됨", {
          fontSize: "24px",
          color: "#ff0",
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1002);
      message.setData("type", "message");

      this.time.delayedCall(2000, () => {
        message.destroy();
        buttons.forEach((b) => b.destroy());
        panel.destroy();
        skipButton.destroy();
        this.scene.stop();
        this.scene.resume("GameScene");
      });
    });

    skipButton.on("pointerover", () => skipButton.setStyle({ color: "#ff0" }));
    skipButton.on("pointerout", () => skipButton.setStyle({ color: "#f00" }));

    this.scale.on("resize", this.resizeUI, this);
  }

  resizeUI(gameSize) {
    if (!this.cameras || !this.cameras.main) return;

    const centerX = this.cameras.main.midPoint.x;
    const centerY = this.cameras.main.midPoint.y;

    this.children.list.forEach((child) => {
      if (!child || !child.setPosition) return;

      const type = child.getData("type");

      if (child instanceof Phaser.GameObjects.Rectangle) {
        child.setPosition(centerX, centerY);
      } else if (type === "title") {
        child.setPosition(centerX, centerY - 150);
      } else if (type === "skip") {
        child.setPosition(centerX, centerY + 120);
      } else if (type === "message") {
        child.setPosition(centerX, centerY + 180);
      } else if (type === "upgrade") {
        const i = child.getData("index");
        if (typeof i === "number") {
          child.setPosition(centerX, centerY - 100 + i * 60);
        }
      }
    });
  }
}
