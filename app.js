const querystring = require('querystring');
const user = require('./src/controller/user');

const handleBlogRouter = require('./src/router/blog');
const { handleUserRouter, getCookieExpires } = require('./src/router/user');
const { get, set } = require('./src/db/redis'); 
// session数据
// const SESSION_DATA = {};

// 用于处理postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''; // key=value
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    });
    console.log(`cookie is`,  req.cookie);

    // 解析session
    let needSetCookie = false;
    let userId = req.cookie.userId;

    // 如果不存在userId 初始化
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        set(userId, {});
    }

    // 处理session
    req.sessionId = userId;
    get(req.sessionId).then(userData => {
        if (userData == null) {
            set(req.sessionId, {});
            req.session = {}
        } else {
            req.session = userData
        }
        return getPostData(req);
    })
    // 处理postData
    .then((postData) => {
        console.log(postData)
        req.body = postData;
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }

        // 处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return;
        }

        // 路由未命中 返回404
        res.writeHead(404, { "Content-type": "text/plain" });
        res.write("404 not found\n");
        res.end();
    })
}

module.exports = serverHandle;