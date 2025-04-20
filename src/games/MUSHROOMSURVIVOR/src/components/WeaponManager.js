// src/components/WeaponManager.js
export default class WeaponManager {
  constructor(scene) {
    this.scene = scene;
    this.unlockedWeapons = scene.registry.get("unlockedWeapons") || ["bullet"];
    this.currentWeapon = this.unlockedWeapons[this.unlockedWeapons.length - 1];
  }

  unlockWeapon(weapon) {
    if (!this.unlockedWeapons.includes(weapon)) {
      this.unlockedWeapons.push(weapon);
      this.currentWeapon = weapon;
      this.scene.registry.set("unlockedWeapons", this.unlockedWeapons);
      localStorage.setItem(
        "unlockedWeapons",
        JSON.stringify(this.unlockedWeapons)
      );

      // ✅ Unlock 모달 표시
      this.scene.scene.launch("UnlockModalScene", {
        message: `${weapon} Unlocked!`,
      });

      // ✅ UI 갱신
      this.scene.updateUI();

      // ✅ 1초 후 자동으로 업그레이드 메뉴 호출
      this.scene.time.delayedCall(1000, () => {
        this.scene.skillManager.showUpgradeMenu();
      });
    }
  }

  attack(player, pointer, bullets) {
    const angle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.worldX,
      pointer.worldY
    );
    const damage = this.scene.playerStats.getStat("damage");

    if (this.currentWeapon === "bullet") {
      const bullet = bullets.create(player.x, player.y, "bullet");
      const speed = 400;
      bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      bullet.setRotation(angle);
      bullet.setData("damage", damage);
      this.scene.time.delayedCall(2000, () => bullet.destroy(), [], this.scene);
    } else if (this.currentWeapon === "laser") {
      const laser = bullets.create(player.x, player.y, "bullet");
      const speed = 600;
      laser.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      laser.setScale(2);
      laser.setRotation(angle);
      laser.setData("damage", damage * 1.5);
      this.scene.time.delayedCall(3000, () => laser.destroy(), [], this.scene);
    } else if (this.currentWeapon === "missile") {
      const missile = bullets.create(player.x, player.y, "bullet");
      const speed = 300;
      missile.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      missile.setRotation(angle);
      missile.setData("damage", damage * 2);

      this.scene.time.delayedCall(
        5000,
        () => {
          if (missile.active) missile.destroy();
        },
        [],
        this.scene
      );

      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          if (missile.active) {
            const nearestEnemy = this.scene.physics.closest(
              missile,
              this.scene.enemies.getChildren()
            );
            if (nearestEnemy) {
              this.scene.physics.moveToObject(missile, nearestEnemy, 300);
            }
          }
        },
        loop: true,
      });
    }
  }

  // 새로운 스킬: 세 발 단거리 공격
  tripleShot(player, pointer, bullets) {
    const baseAngle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.worldX,
      pointer.worldY
    );
    const angles = [-15, 0, 15];
    const speed = 400;
    const range = 200;
    const damage = this.scene.playerStats.getStat("damage") * 1.5;

    angles.forEach((offset) => {
      const angle = baseAngle + Phaser.Math.DegToRad(offset);
      const bullet = bullets.create(player.x, player.y, "bullet");
      bullet.setTint(0x00b7eb);
      bullet.setData("damage", damage);
      bullet.setRotation(angle);

      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;
      bullet.setVelocity(velocityX, velocityY);

      this.scene.time.delayedCall((range / speed) * 1000, () => {
        if (bullet && bullet.active) {
          bullet.destroy();
        }
      });
    });
  }

  getCurrentWeapon() {
    return this.currentWeapon;
  }
}
