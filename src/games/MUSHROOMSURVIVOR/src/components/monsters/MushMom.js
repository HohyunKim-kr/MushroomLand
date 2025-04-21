// src/components/monsters/MushMom.js
import BaseMonster from "./BaseMonster.js";

export default class MushMom extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "MushMom_M"); // preload에 등록된 이미지 키
    this.initAttributes({
      health: 1, // 강력한 체력
      speed: 70, // 보스라서 느리게
      damage: 5, // 꽤 강한 데미지
    });
    this.setScale(1.5); // 보스니까 크기 키움 (시각적 차별)
  }
}
