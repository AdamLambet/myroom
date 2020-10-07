const getList = (author, keyword) => {
    // mock
    return [
        {
            id: 1,
            title: 'title a',
            content: 'content a',
            createTime: 1234238237723,
            author: 'user1'
        }
    ]
}

const getDetail = (id) => {
    // mock
    return [
        {
            id: 1,
            title: 'title a',
            content: 'content a',
            createTime: 1234238237723,
            author: 'userdetail1'
        }
    ]
}

const newBlog = (blogData = {}) => {
    return {
        id: 3 // 新建插入到表中ID
    }
}

const updateBlog = (id, blogData = {}) => {
    return true;
}

const delBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}