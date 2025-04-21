export default class BaseMonster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "enemy") {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.setDepth(1);

    this.setData("health", 1);
    this.setData("speed", 100);
    this.setCollideWorldBounds(true);

    this.ambientSoundKey = "monsterAmbient";
    this.deathSoundKey = "monsterDeath";

    this.isDying = false; // ✅ 중복 애니 방지용

    this.startAmbientSound();
  }

  initAttributes({ health = 1, speed = 100, damage = 1 }) {
    this.setData("health", health);
    this.setData("speed", speed);
    this.setData("damage", damage);
  }

  moveTowards(target) {
    if (target && target.x !== undefined && target.y !== undefined) {
      const speed = this.getData("speed");
      this.scene.physics.moveToObject(this, target, speed);
    }
  }

  takeDamage(amount) {
    if (this.isDying) return; // ✅ 이미 죽는 중이면 아무것도 안 함

    let hp = this.getData("health") - amount;
    this.setData("health", hp);

    if (hp <= 0) {
      this.isDying = true;     // ✅ 중복 애니 방지
      this.playDeathEffect();
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  startAmbientSound() {
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(3000, 7000),
      callback: () => {
        if (this.active && this.scene.sound.get(this.ambientSoundKey)) {
          this.scene.sound.play(this.ambientSoundKey, { volume: 0.2 });
        }
        if (this.active) this.startAmbientSound(); // 재귀 반복
      },
      callbackScope: this,
    });
  }

  playDeathEffect() {
    const textureKey = this.texture.key;
    const animKey = `${textureKey}_explosion`;
    const spriteSheetKey = `${textureKey}_explosionSheet`;

    this.setVisible(false); // ✅ 원래 스프라이트 숨김

    const explosion = this.scene.add.sprite(this.x, this.y, spriteSheetKey);
    explosion.setDepth(10);
    explosion.play(animKey);

    if (this.scene.sound.get(this.deathSoundKey)) {
      this.scene.sound.play(this.deathSoundKey, { volume: 0.5 });
    }

    explosion.on("animationcomplete", () => {
      explosion.destroy();
      this.emit("killed", this); // ✅ GameScene에서 처리되도록
      this.destroy();
    });
  }
}
