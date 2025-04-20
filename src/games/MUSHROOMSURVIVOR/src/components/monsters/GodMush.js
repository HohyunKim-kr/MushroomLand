// src/components/monsters/GodMush.js
import BaseMonster from "./BaseMonster.js";

export default class GodMush extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "godMush"); // preload 등록된 텍스처 키
    this.initAttributes({
      health: 200, // 최강 체력
      speed: 90, // 묵직한 속도
      damage: 10, // 강력한 데미지
    });
    this.setScale(2); // 가장 크게 (압도적인 존재감)
  }
}
