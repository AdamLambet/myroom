const loginCheck = (username, password) => {
    // mock
    if (username === 'user1' && password === '123456') {
        return true;
    }
    return false;
}

module.exports = {
    loginCheck
}