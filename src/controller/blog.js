const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
   let sql = `select * from blogs where 1=1 `;
   if (author) {
       sql += `and author='${author}' `;
   }
   if (keyword) {
       sql += `and title like '%${keyword}%' `;
   }
   sql += `order by createtime desc;`;
   return exec(sql);
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