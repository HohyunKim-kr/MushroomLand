import BaseMonster from "./BaseMonster.js";

export default class OrangeMushroom extends BaseMonster {
  constructor(scene, x, y) {
    super(scene, x, y, "orangeMushroom"); // 'orangeMushroom'은 preload의 texture key
    this.initAttributes({
      health: 1,
      speed: 100,
      damage: 1,
    });
  }
}
