import WeaponManager from '../components/WeaponManager.js';
import PlayerStats from '../components/PlayerStats.js';
import SkillManager from '../components/SkillManager.js';
import OrangeMushroom from '../components/monsters/orangeMushroom.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.player = null;
        this.enemies = null;
        this.bullets = null;
        this.coins = null;
        this.cursors = null;
        this.exp = 0;
        this.level = 1;
        this.coinsCollected = 0;
        this.enemiesKilled = 0;
        this.gameTime = 0;
        this.weaponManager = null;
        this.playerStats = null;
        this.skillManager = null;
        this.tripleShotCooldown = false;
        this.background = null;
    }

    preload() {
        this.load.image('player', '/games/MUSHROOMSURVIVOR/assets/player.png');
        this.load.image('enemy', '/games/MUSHROOMSURVIVOR/assets/enemy.png');
        this.load.image('bullet', '/games/MUSHROOMSURVIVOR/assets/bullet.png');
        this.load.image('coin', '/games/MUSHROOMSURVIVOR/assets/coin.png');
        this.load.image('background', '/games/MUSHROOMSURVIVOR/assets/bgss.png');
    }

    create() {
        this.exp = 0;
        this.level = 1;
        this.coinsCollected = 0;
        this.enemiesKilled = 0;
        this.gameTime = 0;

        this.weaponManager = new WeaponManager(this);
        this.playerStats = new PlayerStats(this);
        this.skillManager = new SkillManager(this);

        const worldWidth = this.scale.width * 2;
        const worldHeight = this.scale.height * 2;
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        this.addBackground(worldWidth, worldHeight);

        this.player = this.physics.add.sprite(worldWidth / 2, worldHeight / 2, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1);
        this.player.setData('health', this.playerStats.getStat('health'));
        this.player.setData('invincible', false);

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.enemies = this.physics.add.group();
        this.bullets = this.physics.add.group();
        this.coins = this.physics.add.group();

        this.physics.add.overlap(this.player, this.enemies, this.playerHit, null, this);
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.time.addEvent({ delay: 1000, callback: this.spawnEnemy, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 500, callback: this.autoAttack, callbackScope: this, loop: true });
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.gameTime++;
                if (this.gameTime >= 180) this.gameOver(true);
            },
            callbackScope: this,
            loop: true,
        });

        this.createUI();
        this.scale.on('resize', this.handleResize, this);
    }

    createUI() {
        const m = 10;
        this.expText = this.add.text(m, m, 'EXP: 0', { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.levelText = this.add.text(m, m + 30, 'Level: 1', { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.coinsText = this.add.text(m, m + 60, 'Coins: 0', { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.healthText = this.add.text(m, m + 90, `Health: ${this.player.getData('health')}`, { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.damageText = this.add.text(m, m + 120, `Damage: ${this.playerStats.getStat('damage').toFixed(1)}`, { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.speedText = this.add.text(m, m + 150, `Speed: ${this.playerStats.getStat('speed')}`, { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.weaponText = this.add.text(m, m + 180, `Weapon: ${this.weaponManager.getCurrentWeapon()}`, { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
        this.cooldownText = this.add.text(m, m + 210, 'Triple Shot: Ready', { fontSize: '20px', color: '#fff' }).setScrollFactor(0);
    }

    addBackground(worldWidth, worldHeight) {
        if (this.textures.exists('background')) {
            this.background = this.add.image(0, 0, 'background').setOrigin(0).setDepth(0);
            this.adjustBackgroundSize();
        } else {
            this.background = this.add.rectangle(0, 0, worldWidth, worldHeight, 0x444444).setOrigin(0).setDepth(0);
        }
    }

    adjustBackgroundSize() {
        if (this.background instanceof Phaser.GameObjects.Image) {
            const worldWidth = this.physics.world.bounds.width;
            const worldHeight = this.physics.world.bounds.height;
            const scaleX = worldWidth / this.background.width;
            const scaleY = worldHeight / this.background.height;
            const scale = Math.max(scaleX, scaleY);
            this.background.setScale(scale);
        }
    }

    handleResize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
        const worldWidth = width * 2;
        const worldHeight = height * 2;

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        this.adjustBackgroundSize();

        const m = 10;
        this.expText.setPosition(m, m);
        this.levelText.setPosition(m, m + 30);
        this.coinsText.setPosition(m, m + 60);
        this.healthText.setPosition(m, m + 90);
        this.damageText.setPosition(m, m + 120);
        this.speedText.setPosition(m, m + 150);
        this.weaponText.setPosition(m, m + 180);
        this.cooldownText.setPosition(m, m + 210);
    }

    update() {
        let speed = this.playerStats.getStat('speed');
        let vx = 0, vy = 0;

        if (this.cursors.left.isDown) vx -= speed;
        if (this.cursors.right.isDown) vx += speed;
        if (this.cursors.up.isDown) vy -= speed;
        if (this.cursors.down.isDown) vy += speed;

        if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
        }

        this.player.setVelocity(vx, vy);

        const pointer = this.input.activePointer;
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
        this.player.setRotation(angle);

        if (this.background instanceof Phaser.GameObjects.Image) {
            this.background.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.tripleShotCooldown) {
            this.weaponManager.tripleShot(this.player, pointer, this.bullets);
            this.tripleShotCooldown = true;
            this.cooldownText.setText('Triple Shot: Cooling Down');

            this.time.delayedCall(5000, () => {
                this.tripleShotCooldown = false;
                this.cooldownText.setText('Triple Shot: Ready');
            });
        }
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(0, this.physics.world.bounds.width);
        const y = Phaser.Math.Between(0, this.physics.world.bounds.height);
    
        let enemy;
        if (this.level < 5) {
            enemy = new OrangeMushroom(this, x, y);
        } else if (this.level < 10) {
            enemy = new Goblin(this, x, y);
        } else {
            enemy = new BossMonster(this, x, y);
        }
    
        this.enemies.add(enemy);
        enemy.moveTowards(this.player);
    }

    autoAttack() {
        this.weaponManager.attack(this.player, this.input.activePointer, this.bullets);
    }

    playerHit(player, enemy) {
        if (this.player.getData('invincible')) return;

        let health = this.player.getData('health') - 1;
        this.player.setData('health', health);
        this.healthText.setText(`Health: ${health}`);

        this.player.setData('invincible', true);
        this.time.delayedCall(1000, () => {
            this.player.setData('invincible', false);
        });

        this.tweens.add({
            targets: this.player,
            alpha: 0.5,
            duration: 200,
            yoyo: true,
            repeat: 5,
        });

        if (health <= 0) {
            this.gameOver(false);
        }
    }

    bulletHitEnemy(bullet, enemy) {
        bullet.destroy();
        let damage = bullet.getData('damage') || 1;
        let health = enemy.getData('health') - damage;
        enemy.setData('health', health);
        if (health <= 0) {
            enemy.destroy();
            this.enemiesKilled++;
            this.exp += 10;
            this.updateUI();
            this.spawnCoin(enemy.x, enemy.y);
            if (this.exp >= this.level * 100) {
                this.levelUp();
            }
        }
    }

    collectCoin(player, coin) {
        coin.destroy();
        this.coinsCollected++;
        this.updateUI();

        if (this.coinsCollected % 5 === 0) {
            //this.scene.sleep(); // GameScene 멈춤
            this.scene.resume('GameScene'); 
            this.skillManager.showUpgradeMenu();
        }

        if (this.coinsCollected >= 10 && !this.weaponManager.unlockedWeapons.includes('laser')) {
            this.weaponManager.unlockWeapon('laser');
        }
    }

    spawnCoin(x, y) {
        this.coins.create(x, y, 'coin');
    }

    updateUI() {
        this.expText.setText(`EXP: ${this.exp}`);
        this.levelText.setText(`Level: ${this.level}`);
        this.coinsText.setText(`Coins: ${this.coinsCollected}`);
        this.healthText.setText(`Health: ${this.player.getData('health')}`);
        this.damageText.setText(`Damage: ${this.playerStats.getStat('damage').toFixed(1)}`);
        this.speedText.setText(`Speed: ${this.playerStats.getStat('speed')}`);
        this.weaponText.setText(`Weapon: ${this.weaponManager.getCurrentWeapon()}`);
    }

    levelUp() {
        this.level++;
        this.exp = 0;
        this.updateUI();
        this.skillManager.showUpgradeMenu();
    }

    gameOver(win) {
        this.registry.set('coinsCollected', this.coinsCollected);
        this.registry.set('enemiesKilled', this.enemiesKilled);
        this.scene.start('UnlockScene', { win });
    }
}