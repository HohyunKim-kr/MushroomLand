// src/components/SkillManager.js
export default class SkillManager {
  constructor(scene) {
    this.scene = scene;
  }

  showUpgradeMenu() {
    this.scene.scene.pause("GameScene");
    this.scene.scene.launch("UpgradeModalScene", { gameScene: this.scene });
  }
}
