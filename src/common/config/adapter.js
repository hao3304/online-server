const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const JWTSession = require('think-session-jwt');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
    type: 'file',
    common: {
        timeout: 24 * 60 * 60 * 1000 // millisecond
    },
    file: {
        handle: fileCache,
        cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
        pathDepth: 1,
        gcInterval: 24 * 60 * 60 * 1000 // gc interval
    }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
    type: 'mysql',
    common: {
        logConnect: isDev,
        logSql: isDev,
        logger: msg => think.logger.info(msg)
    },
    mysql: {
        handle: mysql,
        database: 'online',
        prefix: '',
        encoding: 'utf8',
        host: '116.62.211.9',
        port: '3306',
        user: 'admin',
        password: 'hao3304',
        dateStrings: true
    }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
    type: 'jwt',
    common: {
        cookie: {
            name: 'thinkjs',
        }
    },
    jwt: {
        handle: JWTSession,
        secret: 'secret',  // secret is reqired
        tokenType: 'cookie', // ['query', 'body', 'header', 'cookie'], 'cookie' is default
        tokenName: 'jwt', // if tokenType not 'cookie', this will be token name, 'jwt' is default
        sign: {
            // sign options is not required
        },
        verify: {
            // verify options is not required
        }
    }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
    type: 'nunjucks',
    common: {
        viewPath: path.join(think.ROOT_PATH, 'view'),
        sep: '_',
        extname: '.html'
    },
    nunjucks: {
        handle: nunjucks
    }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
    type: isDev ? 'console' : 'dateFile',
    console: {
        handle: Console
    },
    file: {
        handle: File,
        backups: 10, // max chunk number
        absolute: true,
        maxLogSize: 50 * 1024, // 50M
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    },
    dateFile: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: true,
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    }
};
