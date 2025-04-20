// src/scenes/UnlockScene.js
export default class UnlockScene extends Phaser.Scene {
  constructor() {
    super("UnlockScene");
    this.background = null;
    this.titleText = null;
    this.statsText = null;
    this.unlockText = null;
    this.restartButton = null;
  }

  init(data) {
    this.win = data.win || false;
  }

  create() {
    // 캔버스 크기 가져오기
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    // 배경: 캔버스 크기에 맞게 설정
    this.background = this.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x333333
    );

    // 폰트 크기 동적 조정
    const titleFontSize = Math.min(width * 0.05, 48);
    const statsFontSize = Math.min(width * 0.03, 24);
    const unlockFontSize = Math.min(width * 0.04, 32);
    const buttonFontSize = Math.min(width * 0.03, 32);

    // UI 요소: 화면 중앙에 상대적으로 배치
    this.titleText = this.add
      .text(width / 2, height * 0.2, this.win ? "You Survived!" : "Game Over", {
        fontSize: `${titleFontSize}px`,
        color: this.win ? "#0f0" : "#f00",
      })
      .setOrigin(0.5);

    const coins = this.registry.get("coinsCollected") || 0;
    const kills = this.registry.get("enemiesKilled") || 0;
    this.statsText = this.add
      .text(
        width / 2,
        height * 0.35,
        `Coins: ${coins}\nEnemies Killed: ${kills}`,
        {
          fontSize: `${statsFontSize}px`,
          color: "#fff",
        }
      )
      .setOrigin(0.5);

    let unlockedWeapons = this.registry.get("unlockedWeapons") || ["bullet"];
    let newUnlock = null;

    if (kills >= 10 && !unlockedWeapons.includes("missile")) {
      newUnlock = "missile";
      unlockedWeapons.push(newUnlock);
      this.registry.set("unlockedWeapons", unlockedWeapons);
      localStorage.setItem("unlockedWeapons", JSON.stringify(unlockedWeapons));
      this.unlockText = this.add
        .text(width / 2, height * 0.5, `Unlocked: Missile!`, {
          fontSize: `${unlockFontSize}px`,
          color: "#0f0",
        })
        .setOrigin(0.5);
    }

    this.restartButton = this.add
      .text(width / 2, height * 0.65, "Back to Menu", {
        fontSize: `${buttonFontSize}px`,
        color: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive();

    // 버튼 호버 효과
    this.restartButton.on("pointerover", () => {
      this.restartButton.setStyle({ color: "#ff0" });
      this.restartButton.setScale(1.1);
    });
    this.restartButton.on("pointerout", () => {
      this.restartButton.setStyle({ color: "#fff" });
      this.restartButton.setScale(1.0);
    });

    this.restartButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });

    // 창 크기 변경 이벤트 리스너 추가
    this.scale.on("resize", this.resizeUI, this);
    this.resizeUI({ width: this.scale.width, height: this.scale.height }); // ✅ 최초 UI 강제 resize 호출
  }

  resizeUI(gameSize) {
    if (!gameSize || !this.scene.isActive()) return;

    const width = gameSize.width;
    const height = gameSize.height;

    const titleFontSize = Math.min(width * 0.05, 48);
    const statsFontSize = Math.min(width * 0.03, 24);
    const unlockFontSize = Math.min(width * 0.04, 32);
    const buttonFontSize = Math.min(width * 0.03, 32);

    if (this.background && typeof this.background.setSize === "function") {
      this.background.setPosition(width / 2, height / 2);
      this.background.setSize(width, height);
    }

    this.titleText?.setPosition(width / 2, height * 0.2);
    this.titleText?.setFontSize(titleFontSize);

    this.statsText?.setPosition(width / 2, height * 0.35);
    this.statsText?.setFontSize(statsFontSize);

    if (this.unlockText) {
      this.unlockText.setPosition(width / 2, height * 0.5);
      this.unlockText.setFontSize(unlockFontSize);
    }

    this.restartButton?.setPosition(width / 2, height * 0.65);
    this.restartButton?.setFontSize(buttonFontSize);
  }
}
