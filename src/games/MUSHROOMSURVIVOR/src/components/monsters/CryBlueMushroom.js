// src/components/monsters/CryBlueMushroom.js
import BaseMonster from "./BaseMonster.js";

export default class CryBlueMushroom extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "cryBlueMushroom"); // preload에서 로드한 key
    this.initAttributes({
      health: 20, // 높은 체력
      speed: 100, // 기본 속도보다 조금 빠름
      damage: 3, // 강한 데미지
    });
  }
}
