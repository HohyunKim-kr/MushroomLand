export default class UnlockModalScene extends Phaser.Scene {
  constructor() {
    super("UnlockModalScene");
  }

  init(data) {
    this.message = data.message || "Unlocked!";
    this.fromWeaponUnlock = data.fromWeaponUnlock || false;
  }

  create() {
    const camera = this.cameras.main;
    const centerX = camera.midPoint.x;
    const centerY = camera.midPoint.y;

    // ✅ UI 생성
    this.panel = this.add
      .rectangle(centerX, centerY, 400, 200, 0x333333)
      .setScrollFactor(0)
      .setDepth(1000)
      .disableInteractive();

    this.text = this.add
      .text(centerX, centerY, this.message, {
        fontSize: "32px",
        color: "#0f0",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001)
      .disableInteractive();

    // ✅ 리사이즈 이벤트 등록 (안전하게)
    this.scale.on("resize", this.onResize, this);

    // ✅ 1초 후 자동 종료 + GameScene resume + upgrade modal 열기 (옵션)
    this.time.delayedCall(1000, () => {
      this.panel.destroy();
      this.text.destroy();

      // ✅ 리사이즈 리스너 제거
      this.scale.off("resize", this.onResize, this);

      // ✅ GameScene 재개
      if (this.scene.isPaused("GameScene")) {
        this.scene.resume("GameScene");
      }

      // ✅ 무기 해금으로부터 왔다면 업그레이드 모달 자동 호출
      if (this.fromWeaponUnlock) {
        this.scene.get("GameScene").skillManager.showUpgradeMenu();
      }

      this.scene.stop();
    });
  }

  onResize() {
    if (!this.cameras || !this.cameras.main) return;

    const cx = this.cameras.main.midPoint.x;
    const cy = this.cameras.main.midPoint.y;

    if (this.panel) this.panel.setPosition(cx, cy);
    if (this.text) this.text.setPosition(cx, cy);
  }
}
