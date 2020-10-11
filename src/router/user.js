const { login, userRegistry } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// session数据
const SESSION_DATA = {};

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const gmtString = d.toGMTString();
    console.log(`gmtstring is ${gmtString}`);
    return gmtString;
}

const handleUserRouter = (req, res) => {
    const method = req.method; // get post
    const path = req.path;

    // 登陆
    if (method === 'GET' && path === '/api/user/login') {
        // const { username, password } = req.body;
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data && data.username) {
                // 操作cookie
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
                
                return new SuccessModel(data);
            }
            return new ErrorModel(data); 
        })
    }

    // 注册
    if (method === 'POST' && path === '/api/user/registry') {
        const { username, password, realname } = req.body;
        const result = userRegistry(username, password, realname);
        return result.then((insertData => {
            return new SuccessModel(insertData);
        }))
    }

}

module.exports = handleUserRouter;