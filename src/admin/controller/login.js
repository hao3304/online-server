const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    if(this.isPost) {
      const {username, password} = this.post();
      const userModel = this.model('user');
      const user = await userModel.where({username:username, password:password, admin:1}).find();
      if(!think.isEmpty(user)) {
           const token = await this.session('user', user);
           await this.cookie('jwt',token);
           this.redirect('/admin');
      }else{
          this.assign('fail', '用户名或密码错误！');
          return this.display();
      }

    }else{

        this.assign('title', '登录');
        return this.display();
    }

  }
};
