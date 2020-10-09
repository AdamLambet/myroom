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
        const detail = getDetail(id);
        return detail.then(detailData => {
            return new SuccessModel(detailData);
        })
    }

    // 新建一篇博客 { }
    if (method === 'POST' && path === '/api/blog/new') {
        req.body.author = 'zhangsan'; // todo
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(id, req.body);
        return result.then(updateResult => {
            return updateResult;
        })
    }

    // 删除一篇博客
    if (method === 'POST' && path === '/api/blog/delete') {
        const author = 'zhangsan'; // todo
        const result = delBlog(id, author);
        return result.then(delResult => {
            return delResult;
        })
    }

}

module.exports = hanldleBlogRouter;