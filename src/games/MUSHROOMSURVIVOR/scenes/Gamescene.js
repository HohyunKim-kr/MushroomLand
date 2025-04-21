import WeaponManager from "../components/WeaponManager.js";
import PlayerStats from "../components/PlayerStats.js";
import SkillManager from "../components/SkillManager.js";
import Spore from "../components/monsters/Spore.js";
import OrangeMushroom from "../components/monsters/OrangeMushroom.js";
import GreenMushroom from "../components/monsters/GreenMushroom.js";
import CryBlueMushroom from "../components/monsters/CryBlueMushroom.js";
import MushMom from "../components/monsters/MushMom.js";
import BlueMushMom from "../components/monsters/BlueMushMom.js";
import GodMush from "../components/monsters/GodMush.js";

const MONSTER_POOL = {
  1: [Spore],
  3: [Spore, OrangeMushroom],
  5: [Spore, OrangeMushroom, GreenMushroom],
  7: [OrangeMushroom, GreenMushroom, CryBlueMushroom],
  10: [MushMom], // 보스
  11: [CryBlueMushroom, GreenMushroom],
  15: [BlueMushMom], // 중간보스
  16: [GreenMushroom, CryBlueMushroom],
  20: [GodMush], // 최종보스
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
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

    // 몬스터 사운드 로딩
    this.load.audio('monsterAmbient', '/sfx/m_ambient.mp3');
    this.load.audio('monsterDeath', '/sfx/m_death.mp3');


    this.load.image("player", "../games/mushroomsurvivor/assets/player11.png");
    this.load.image("bullet", "/games/mushroomsurvivor/assets/bullet.png");
    this.load.image("coin", "/games/mushroomsurvivor/assets/coin.png");
    this.load.image("background", "/games/mushroomsurvivor/assets/mushBG.png");

    // 몬스터 이미지 로딩

    // spore
    this.load.image("spore", "/games/mushroomsurvivor/assets/spore_M.png");

    // orangeMushroom
    this.load.image(
      "orangeMushroom",
      "/games/mushroomsurvivor/assets/orangeMushroom_M.png"
    );

    // greenMushroom
    this.load.image(
      "greenMushroom",
      "/games/mushroomsurvivor/assets/greenMushroom_M.png"
    );
    
    //cryBlueMushroom
    this.load.image(
      "cryBlueMushroom",
      "/games/mushroomsurvivor/assets/cryBlueMushroom.png"
    );

    // mushMom
    this.load.image(
      "MushMom_M",
      "/games/mushroomsurvivor/assets/MushMom_M.png"
    );

    // blueMushMom
    this.load.image(
      "blueMushMom_M",
      "/games/mushroomsurvivor/assets/blueMushMom_M.png"
    );

    // godMush
    this.load.image("godMush", "/games/mushroomsurvivor/assets/godMush_M.png");

    // effects sprite 로딩
    // this.load.spritesheet('monsterExplosion', '/games/MUSHROOMSURVIVOR/assets/dieEffect.png', {
    //   frameWidth: 960 / 4,   // ← 전체 가로 / 4
    //   frameHeight: 466 / 2,  // ← 전체 세로 / 2
    // });

    // 예시로 두 개 등록 (추가하면 더 작성)

    // spore_explosion
    this.load.spritesheet('spore_explosionSheet', '/games/mushroomsurvivor/assets/orangeEffect_s.png', {
      frameWidth: 240, frameHeight: 240
    });

    // orangeMushroom_explosion
    this.load.spritesheet('orangeMushroom_explosionSheet', '/games/mushroomsurvivor/assets/dieEffect.png', {
      frameWidth: 240, frameHeight: 240
    });

    // greenMushroom_explosion
    this.load.spritesheet('greenMushroom_explosionSheet', '/games/mushroomsurvivor/assets/greenEffect_s.png', {
      frameWidth: 166.5,
      frameHeight: 187.5,
    });

    // blueMushMom_explosion
    this.load.spritesheet('cryBlueMushroom_explosionSheet', '/games/mushroomsurvivor/assets/blueEffect_s.png', {
      frameWidth: 166.5,
      frameHeight: 187.5,
    });
    
    this.load.spritesheet('godMush_explosionSheet', '/games/mushroomsurvivor/assets/redEffect_s.png', {
      frameWidth: 166.5,
      frameHeight: 187.5,
    });
    
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


    this.player = this.physics.add.sprite(
      worldWidth / 2,
      worldHeight / 2,
      "player"
    );
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1);
    this.player.setScale(1.3);
    this.player.setData("health", this.playerStats.getStat("health"));
    this.player.setData("invincible", false);

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

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.playerHit,
      null,
      this
    );
    this.physics.add.overlap(
      this.bullets,
      this.enemies,
      this.bulletHitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    );

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 500,
      callback: this.autoAttack,
      callbackScope: this,
      loop: true,
    });
    // this.anims.create({
    //   key: 'monsterExplode',
    //   frames: this.anims.generateFrameNumbers('monsterExplosion', { start: 0, end: 15 }),
    //   frameRate: 20,
    //   hideOnComplete: true,
    // });
    this.input.keyboard.on('keydown-L', (event) => {
      if (event.shiftKey) {
        this.level = 10;
        this.exp = 0;
        this.updateUI();
        console.log('🚀 치트 발동! 레벨 10으로 설정됨');
      }
    });

    this.anims.create({
      key: 'spore_explosion',
      frames: this.anims.generateFrameNumbers('spore_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });
    this.anims.create({
      key: 'orangeMushroom_explosion',
      frames: this.anims.generateFrameNumbers('orangeMushroom_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });
    this.anims.create({
      key: 'MushMom_M_explosion',
      frames: this.anims.generateFrameNumbers('orangeMushroom_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });
    this.anims.create({
      key: 'greenMushroom_explosion',
      frames: this.anims.generateFrameNumbers('greenMushroom_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });
    this.anims.create({
      key: 'cryBlueMushroom_explosion',
      frames: this.anims.generateFrameNumbers('cryBlueMushroom_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });    
    this.anims.create({
      key: 'blueMushMom_M_explosion',
      frames: this.anims.generateFrameNumbers('cryBlueMushroom_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });    
    this.anims.create({
      key: 'godMush_explosion',
      frames: this.anims.generateFrameNumbers('godMush_explosionSheet', { start: 0, end: 7 }),
      frameRate: 10,
      hideOnComplete: true,
    });
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: () => {
    //     this.gameTime++;
    //     if (this.gameTime >= 180) this.gameOver(true);
    //   },
    //   callbackScope: this,
    //   loop: true,
    // });

    
    this.createUI();
    this.scale.on("resize", this.handleResize, this);
  }

  createUI() {
    const m = 10;
    this.expText = this.add
      .text(m, m, "EXP: 0", { fontSize: "20px", color: "#fff" })
      .setScrollFactor(0);
    this.levelText = this.add
      .text(m, m + 30, "Level: 1", { fontSize: "20px", color: "#fff" })
      .setScrollFactor(0);
    this.coinsText = this.add
      .text(m, m + 60, "Coins: 0", { fontSize: "20px", color: "#fff" })
      .setScrollFactor(0);
    this.healthText = this.add
      .text(m, m + 90, `Health: ${this.player.getData("health")}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setScrollFactor(0);
    this.damageText = this.add
      .text(
        m,
        m + 120,
        `Damage: ${this.playerStats.getStat("damage").toFixed(1)}`,
        { fontSize: "20px", color: "#fff" }
      )
      .setScrollFactor(0);
    this.speedText = this.add
      .text(m, m + 150, `Speed: ${this.playerStats.getStat("speed")}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setScrollFactor(0);
    this.weaponText = this.add
      .text(m, m + 180, `Weapon: ${this.weaponManager.getCurrentWeapon()}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setScrollFactor(0);
    this.cooldownText = this.add
      .text(m, m + 210, "Triple Shot: Ready", {
        fontSize: "20px",
        color: "#fff",
      })
      .setScrollFactor(0);
  }

  addBackground(worldWidth, worldHeight) {
    if (this.textures.exists("background")) {
      this.background = this.add
        .image(0, 0, "background")
        .setOrigin(0)
        .setDepth(0);
      this.adjustBackgroundSize();
    } else {
      this.background = this.add
        .rectangle(0, 0, worldWidth, worldHeight, 0x444444)
        .setOrigin(0)
        .setDepth(0);
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
    if (!gameSize || !this.scene.isActive()) return;
  
    const width = gameSize.width;
    const height = gameSize.height;
  
    // ✅ 월드는 처음 설정한 크기 유지 (변경 ❌)
    // this.physics.world.setBounds(...) 호출 생략 또는 고정값 사용
  
    // ✅ 카메라 바운드는 월드 기준으로 그대로 유지
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );
  
    // ✅ 카메라도 플레이어 계속 따라가게
    if (this.player) {
      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }
  
    // ✅ 배경 사이즈 조정
    this.adjustBackgroundSize();
  
    // ✅ UI 고정 위치 재조정
    const m = 10;
    this.expText?.setPosition(m, m);
    this.levelText?.setPosition(m, m + 30);
    this.coinsText?.setPosition(m, m + 60);
    this.healthText?.setPosition(m, m + 90);
    this.damageText?.setPosition(m, m + 120);
    this.speedText?.setPosition(m, m + 150);
    this.weaponText?.setPosition(m, m + 180);
    this.cooldownText?.setPosition(m, m + 210);
  }
  

  update() {
    let speed = this.playerStats.getStat("speed");
    let vx = 0,
      vy = 0;

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
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      pointer.worldX,
      pointer.worldY
    );
    this.player.setRotation(angle);

    if (this.background instanceof Phaser.GameObjects.Image) {
      this.background.setPosition(
        this.cameras.main.scrollX,
        this.cameras.main.scrollY
      );
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.space) &&
      !this.tripleShotCooldown
    ) {
      this.weaponManager.tripleShot(this.player, pointer, this.bullets);
      this.tripleShotCooldown = true;
      this.cooldownText.setText("Triple Shot: Cooling Down");

      this.time.delayedCall(5000, () => {
        this.tripleShotCooldown = false;
        this.cooldownText.setText("Triple Shot: Ready");
      });
    }

    // 💥 여기에 추가: 몬스터 AI 호출
    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.moveTowards) {
        enemy.moveTowards(this.player);
      }
    });
  }

  spawnEnemy() {
    const level = this.level;
    const worldWidth = this.physics.world.bounds.width;
    const worldHeight = this.physics.world.bounds.height;
    const x = Phaser.Math.Between(0, worldWidth);
    const y = Phaser.Math.Between(0, worldHeight);

    // 보스는 특정 레벨에서만 1번만 등장하도록
    if ([10, 15, 20].includes(level)) {
      if (!this[`bossSpawned_${level}`]) {
        const BossClass = MONSTER_POOL[level][0];
        const boss = new BossClass(this, x, y);
        this.enemies.add(boss);
        this[`bossSpawned_${level}`] = true;
      }
      // return;
    }

    // 일반 몬스터 랜덤 선택
    const availableClasses = this.getAvailableMonstersForLevel(level);
    const MonsterClass = Phaser.Utils.Array.GetRandom(availableClasses);
    const enemy = new MonsterClass(this, x, y);
    this.enemies.add(enemy);

    enemy.once("killed", (deadEnemy) => {
      this.enemiesKilled++;
      this.exp += 20;
      this.updateUI();
      this.spawnCoin(deadEnemy.x, deadEnemy.y);
      if (this.exp >= this.level * 100) {
        this.levelUp();
      }
      if (deadEnemy.texture.key === "godMush") {
        this.time.delayedCall(1000, () => this.gameOver(true));
      }
    });
  }

  getAvailableMonstersForLevel(level) {
    let highestAvailableLevel = 1;
    for (let lvl of Object.keys(MONSTER_POOL)) {
      if (parseInt(lvl) <= level) highestAvailableLevel = parseInt(lvl);
    }
    return MONSTER_POOL[highestAvailableLevel] || [Spore];
  }

  autoAttack() {
    this.weaponManager.attack(
      this.player,
      this.input.activePointer,
      this.bullets
    );
  }

  playerHit(player, enemy) {
    if (this.player.getData("invincible")) return;

    let health = this.player.getData("health") - 1;
    this.player.setData("health", health);
    this.healthText.setText(`Health: ${health}`);

    this.player.setData("invincible", true);
    this.time.delayedCall(1000, () => {
      this.player.setData("invincible", false);
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
  
    const damage = bullet.getData("damage") || 1;
  
    // 몬스터가 자체적으로 죽음 판단 및 애니메이션 실행
    if (enemy.takeDamage) {
      enemy.takeDamage(damage);
    }
  
    // 더 이상 직접 destroy() 하지 않음
    // 죽었을 경우엔 BaseMonster 내 playDeathEffect()에서 emit("killed") 처리됨
  }

  collectCoin(player, coin) {
    coin.destroy();
    this.coinsCollected++;
    this.updateUI();

    if (this.coinsCollected % 3 === 0) {
      //this.scene.sleep(); // GameScene 멈춤
      //this.scene.resume("GameScene");
      this.skillManager.showUpgradeMenu();
    }

    if (
      this.coinsCollected >= 10 &&
      !this.weaponManager.unlockedWeapons.includes("laser")
    ) {
      this.weaponManager.unlockWeapon("laser");
    }
  }

  spawnCoin(x, y) {
    this.coins.create(x, y, "coin");
  }

  updateUI() {
    this.expText.setText(`EXP: ${this.exp}`);
    this.levelText.setText(`Level: ${this.level}`);
    this.coinsText.setText(`Coins: ${this.coinsCollected}`);
    this.healthText.setText(`Health: ${this.player.getData("health")}`);
    this.damageText.setText(
      `Damage: ${this.playerStats.getStat("damage").toFixed(1)}`
    );
    this.speedText.setText(`Speed: ${this.playerStats.getStat("speed")}`);
    this.weaponText.setText(`Weapon: ${this.weaponManager.getCurrentWeapon()}`);
  }

  levelUp() {
    this.level++;
    this.exp = 0;
    this.updateUI();
    this.skillManager.showUpgradeMenu();
  }

  gameOver(win) {
    // ✅ 기록 저장
    this.registry.set("coinsCollected", this.coinsCollected);
    this.registry.set("enemiesKilled", this.enemiesKilled);

    // ✅ 게임 상태 초기화
    this.exp = 0;
    this.level = 1;
    this.coinsCollected = 0;
    this.enemiesKilled = 0;
    this.gameTime = 0;

    // ✅ 플레이어 능력치도 초기화 (필요 시)
    this.registry.set("playerStats", {
      damage: 1,
      speed: 200,
      health: 3,
    });
    localStorage.setItem(
      "playerStats",
      JSON.stringify({
        damage: 1,
        speed: 200,
        health: 3,
      })
    );

    this.scene.start("UnlockScene", { win });
  }
}
