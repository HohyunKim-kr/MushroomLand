// src/components/monsters/Spore.js
import BaseMonster from "./BaseMonster.js";

export default class Spore extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "spore"); // 'spore'는 preload에서 로드한 texture key
    this.initAttributes({
      health: 1, // 가장 낮은 체력
      speed: 80, // 느리게
      damage: 1, // 기본 데미지
    });
  }
}
