const Base = require('./base.js');

module.exports = class extends Base {
  async postAction() {
      let {username, password} = this.post();
      let userModel = this.model('user');
      let user = await userModel.where({username,password}).find();
      if(!think.isEmpty(user)) {
            let token = await this.session('user', user)
            return this.success(token)
      }else{
        return this.fail(10000, '用户名或密码错误！')
      }
    }
  getAction() {
    return this.fail(10001, '不支持该方法')
  }
};
