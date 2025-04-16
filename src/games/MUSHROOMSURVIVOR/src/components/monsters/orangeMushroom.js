import BaseMonster from './BaseMonster.js';

export default class OrangeMushroom extends BaseMonster {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        this.initAttributes(3, 100);
    }
}
