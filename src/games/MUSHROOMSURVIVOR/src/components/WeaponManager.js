// src/components/WeaponManager.js
export default class WeaponManager {
    constructor(scene) {
        this.scene = scene;
        this.unlockedWeapons = scene.registry.get('unlockedWeapons') || ['bullet'];
        this.currentWeapon = this.unlockedWeapons[this.unlockedWeapons.length - 1];
    }

    unlockWeapon(weapon) {
        if (!this.unlockedWeapons.includes(weapon)) {
            this.unlockedWeapons.push(weapon);
            this.currentWeapon = weapon;
            this.scene.registry.set('unlockedWeapons', this.unlockedWeapons);
            localStorage.setItem('unlockedWeapons', JSON.stringify(this.unlockedWeapons));
            this.scene.scene.launch('UnlockModalScene', { message: `${weapon} Unlocked!` });
            this.scene.updateUI();
        }
    }

    attack(player, pointer, bullets) {
        const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY);
        const damage = this.scene.playerStats.getStat('damage');

        if (this.currentWeapon === 'bullet') {
            const bullet = bullets.create(player.x, player.y, 'bullet');
            const speed = 400;
            bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            bullet.setRotation(angle);
            bullet.setData('damage', damage);
            this.scene.time.delayedCall(2000, () => bullet.destroy(), [], this.scene);
        } else if (this.currentWeapon === 'laser') {
            const laser = bullets.create(player.x, player.y, 'bullet');
            const speed = 600;
            laser.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            laser.setScale(2);
            laser.setRotation(angle);
            laser.setData('damage', damage * 1.5);
            this.scene.time.delayedCall(3000, () => laser.destroy(), [], this.scene);
        } else if (this.currentWeapon === 'missile') {
            const missile = bullets.create(player.x, player.y, 'bullet');
            const speed = 300;
            missile.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            missile.setRotation(angle);
            missile.setData('damage', damage * 2);
            this.scene.time.delayedCall(5000, () => {
                if (missile.active) missile.destroy();
            }, [], this.scene);
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                    if (missile.active) {
                        const nearestEnemy = this.scene.physics.closest(missile, this.scene.enemies.getChildren());
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
        const baseAngle = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY);
        const angles = [-15, 0, 15]; // -15도, 0도, +15도
        const speed = 400; // 화살 속도
        const range = 200; // 단거리: 200px
        const damage = this.scene.playerStats.getStat('damage') * 1.5; // 데미지 1.5배

        angles.forEach(offset => {
            const angle = baseAngle + Phaser.Math.DegToRad(offset);
            const bullet = bullets.create(player.x, player.y, 'bullet');
            bullet.setTint(0x00b7eb); // 파란색으로 시각적 구분
            bullet.setData('damage', damage);
            bullet.setRotation(angle);

            // 속도 벡터 계산
            const velocityX = Math.cos(angle) * speed;
            const velocityY = Math.sin(angle) * speed;
            bullet.setVelocity(velocityX, velocityY);

            // 단거리 설정: 일정 거리 후 소멸
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