const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
    console.log('error')
})

function set(key, val) {
    console.log(`redis set ${key}:${val}`)
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

function get(key) {
    console.log(`redis get key ${key}`);
    const promise = new Promise((resolve, reject) => {
       redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(e)
            }
       })
    })
    return promise
}

module.exports = {
    get,
    set
}