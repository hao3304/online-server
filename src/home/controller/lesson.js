const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    async getAction() {
        let lesson = this.model('lesson');
        const data = await lesson.select();
        return this.success(data)
    }
};
