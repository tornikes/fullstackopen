const blogsRouter = require('express').Router();
const Blog = require('../models/blogEntry');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
    const entries = await Blog.find({}).populate('user');
    res.json(entries);
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
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
    if (!body.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const author = await User.findById(decodedToken.id);
    body.user = author.id;
    const blog = new Blog(body);
    const result = await blog.save();
    author.blogs = author.blogs.concat(blog);
    await author.save();
    res.status(200).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
    const item = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json(item);
});

blogsRouter.put('/:id', async (req, res) => {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

module.exports = blogsRouter;