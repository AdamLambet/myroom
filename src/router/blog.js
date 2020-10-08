const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel }  = require('../model/resModel');

const hanldleBlogRouter = (req, res) => {
    const method = req.method; // get post
    const path = req.path;
    const id = req.query.id;
    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        });
    }

    // 获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        const data = getDetail(id);

        return new SuccessModel(data);
    }

    // 新建一篇博客
    if (method === 'POST' && path === '/api/blog/new') {
        const blogData = newBlog(req.body);
        return new SuccessModel(blogData);
    }

    // 更新一篇博客
    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(req.body);
        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('blog update fail');
        }
    }

    // 删除一篇博客
    if (method === 'POST' && path === '/api/blog/delete') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('blog delete fail');
        }
    }

}

module.exports = hanldleBlogRouter;