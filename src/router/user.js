const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
    const method = req.method; // get post
    const path = req.path;

    // 登陆
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body;
        const result = loginCheck(username, password);
        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('login fail');
        }
    }
}

module.exports = handleUserRouter;