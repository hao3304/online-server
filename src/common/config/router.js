module.exports = [
    [/\/api\/(\w+)(?:\/(\d+))?/, '/:1?id=:2', 'rest'],
    [/\/admin\/(\w+)\/(\w+)\/(\d+)/, '/admin/:1/:2?id=:3'],
];
