const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        if(this.isPost) {
            const {page = 1, limit = 10 } = this.post();

            let model = this.model('student');
            let school =await this.model('common').where({field:'school'}).select();
            let data = await model.join("right join user on student.id = user.info_id")
                .where({type:1})
                .page(page,limit).field(['student.id','name','username','sex','age','school','user.create_time'])
                .countSelect();

            data.errno = 0;
            data.data = data.data.map(function (d) {
                let s = school.find(s=>s.key == d.school) || {};
                return {...d, school_name: s.value,sex: d.sex == 0?'女':'男' }
            });
            this.body = data;
        }else{
            this.assign('title', '学生管理');
            return this.display();
        }
    }

    async addAction() {
        if(this.isPost) {
            const {username, password, name, sex, age, school} = this.post();
            const user = this.model('user');
            const student = this.model('student');

            const one = await user.where({username:username}).find();
            if(!think.isEmpty(one)) {
                this.fail(10000,'用户名已经存在！')
            }else{
                const insertId = await student.add({name,sex,age: parseInt(age),school});
                await user.add({username,password,type:1,info_id: insertId, admin:0});
                this.success('ok')
            }

        }else{
            const common = this.model('common');
            const school = await common.where({field:'school'}).select();
            this.assign('school', school);
            return this.display('admin/student_manage');
        }
    }

    async deleteAction() {
        if(this.isPost) {
            const id = this.get('id');
            if(id) {
                let student = this.model('student');
                let user = this.model('user');
                await student.where({id: id}).delete();
                await user.where({info_id: id}).delete();
                this.success('ok');
            }else{
                this.fail(10000,'参数错误！');
            }
        }

    }

    async editAction() {
        if(this.isGet){
            const id = this.get('id');
            const user = this.model('user');
            const student = this.model('student');
            const data = await student.where({id:id}).find();
            const user_data = await user.where({type:1, info_id: id}).find();
            this.assign('data', data);
            this.assign('user_data', user_data);
            return this.display('admin/student_manage');
        }
    }


};
