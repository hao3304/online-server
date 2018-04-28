const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    let {field = 'school'} = this.query();
    const commonModel = this.model('common');
    const data = await commonModel.where({field}).select();
    this.assign({data});
    return this.display();
  }

  async addAction() {

    if(this.isPost) {
      const form = this.post();
      const commonModel = this.model('common');
      const one = await commonModel.where({field:form.field,key: form.key}).find();
      if(think.isEmpty(one)) {
        await commonModel.add(form);
        this.success('ok');
      }else{
        this.fail(10002,'重复的key值！');
      }


    }else {
        return this.display('admin/common_manage');
    }
  }

   async deleteAction() {
    if(this.isPost) {
        const id = this.get('id');
        if(id) {
            const commonModel = this.model('common');
            await commonModel.where({id:id}).delete();
            this.success('ok');

        }else{
          this.fail(10000, '参数错误！');
        }
    }
  }
};
