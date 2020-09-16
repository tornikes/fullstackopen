const commentRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blogEntry');

commentRouter.post('/', async (req, res) => {
    console.log(req.body);

    const comment = new Comment({
        blog: req.body.id,
        content: req.body.content
    });
    await comment.save();
    const blog = await Blog.findById(req.body.id);
    blog.comments.push(comment);
    await blog.save();
    res.json(comment);
});

module.exports = commentRouter;