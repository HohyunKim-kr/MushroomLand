// src/components/monsters/BlueMushMom.js
import BaseMonster from "./BaseMonster.js";

export default class BlueMushMom extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "blueMushMom_M"); // preload에 등록된 텍스처 키
    this.initAttributes({
      health: 1, // 보스보다 더 높은 체력
      speed: 80, // 살짝 더 빠름
      damage: 7, // 더 강한 데미지
    });
    this.setScale(1.7); // 더 크게 (보스 시각 강조)
  }
}
