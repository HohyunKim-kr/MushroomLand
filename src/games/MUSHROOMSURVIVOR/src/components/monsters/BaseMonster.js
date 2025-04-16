// src/components/monsters/BaseMonster.js

export default class BaseMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'enemy') {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.setDepth(1);

        this.setData('health', 1);
        this.setData('speed', 100);
        this.setCollideWorldBounds(true);
    }

    initAttributes({ health = 1, speed = 100, damage = 1 }) {
        this.setData('health', health);
        this.setData('speed', speed);
        this.setData('damage', damage);
    }

    moveTowards(target) {
        if (target && target.x !== undefined && target.y !== undefined) {
            const speed = this.getData('speed');
            this.scene.physics.moveToObject(this, target, speed);
        }
    }

    takeDamage(amount) {
        let hp = this.getData('health') - amount;
        this.setData('health', hp);
        if (hp <= 0) {
            this.destroy();
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        // 추가적으로 매 프레임마다 실행할 AI가 있다면 여기 작성
    }
}
