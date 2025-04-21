// src/components/monsters/GreenMushroom.js
import BaseMonster from "./BaseMonster.js";

export default class GreenMushroom extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "greenMushroom"); // 'greenMushroom'은 preload의 texture key
    this.initAttributes({
      health: 2, // 꽤 높은 체력
      speed: 90, // 보통 속도
      damage: 2, // 데미지도 조금 상승
    });
  }
}
