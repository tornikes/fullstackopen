const blogsRouter = require('express').Router();
const Blog = require('../models/blogEntry');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
    const entries = await Blog.find({})
        .populate('user comments');
    res.json(entries);
});

blogsRouter.get('/:id', async (req, res) => {
    const entry = await Blog.findById(req.params.id).populate('user comments');
    res.json(entry);
});

blogsRouter.post('/', async (req, res) => {
    if (!req.body.url || !req.body.title) {
        return res.status(400).json({
            error: 'url or title is missing'
        });
    }
    const body = req.body;
    if (typeof body.likes === 'undefined') {
        body.likes = 0;
    }
    if (!body.token) {
        return res.status(401).json({
            error: 'No Token Provided'
        });
    }
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const author = await User.findById(decodedToken.id);
    body.user = author.id;
    const blog = new Blog(body);
    const result = await (await blog.save()).execPopulate('user');
    author.blogs = author.blogs.concat(blog);
    await author.update();
    res.status(200).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
    if (!req.body.token) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const blog = await Blog.findById(req.params.id);
    const user = await User.findById(decodedToken.id);
    if (blog.user.toString() !== user.id) {
        return res.status(401).json({
            error: 'resource does not belong to user'
        });
    }
    await blog.remove();
    user.blogs = user.blogs.filter(b => b._id !== blog.id);
    await user.save();
    res.json(blog);
});

blogsRouter.put('/:id', async (req, res) => {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await updated.populate('user').execPopulate();
    res.json(updated);
});

module.exports = blogsRouter;