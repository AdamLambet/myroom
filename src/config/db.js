const env = process.env.NODE_ENV; // 环境参数

let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
    // redis
    REDIS_CONF = {
        host: 'localhost',
        port: '6379'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
    // redis
    REDIS_CONF = {
        host: 'localhost',
        port: '6379'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}