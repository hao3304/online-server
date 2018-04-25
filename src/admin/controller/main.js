const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    this.assign('title', '主页')
    return this.display();
  }
};
