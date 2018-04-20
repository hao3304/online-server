module.exports = class extends think.Model {
    get schema() {
        return {
            create_time: {
                type: 'datetime',
                default: ()=> think.datetime()
            },
            update_time: {
                type: 'datetime',
                update: true,
                default: ()=> think.datetime()
            }
        }
    }
};
