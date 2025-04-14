// src/components/PlayerStats.js
export default class PlayerStats {
    constructor(scene) {
        this.scene = scene;
        this.stats = scene.registry.get('playerStats') || {
            damage: 1,
            speed: 200,
            health: 3,
        };
        this.scene.registry.set('playerStats', this.stats);
        localStorage.setItem('playerStats', JSON.stringify(this.stats));

        // 플레이어 체력 동기화
        if (this.scene.player) {
            this.scene.player.setData('health', this.stats.health);
        }
    }

    applyUpgrade(effect, value) {
        console.log(`Applying upgrade: ${effect} with value ${value}`);
        if (effect === 'damage') {
            this.stats.damage += value;
        } else if (effect === 'speed') {
            this.stats.speed += value;
        } else if (effect === 'health') {
            this.stats.health += value;
            // 플레이어 체력 동기화
            if (this.scene.player) {
                const currentHealth = this.scene.player.getData('health') || this.stats.health;
                this.scene.player.setData('health', currentHealth + value);
                this.scene.healthText.setText(`Health: ${this.scene.player.getData('health')}`);
            }
        }
        this.scene.registry.set('playerStats', this.stats);
        localStorage.setItem('playerStats', JSON.stringify(this.stats));
        console.log(`Upgraded ${effect}: ${this.stats[effect]}`);
        this.scene.updateUI();
    }

    getStat(stat) {
        return this.stats[stat];
    }
}