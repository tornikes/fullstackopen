const blogsRouter = require('express').Router();
const Blog = require('../models/blogEntry');

blogsRouter.get('/', async (req, res) => {
    const entries = await Blog.find({});
    res.json(entries);
});

blogsRouter.post('/', async (req, res) => {
    if(!req.body.url || !req.body.title) {
        return res.status(400).end();
    }
    const body = req.body;
    if(typeof body.likes === 'undefined') {
        body.likes = 0;
    }
    const blog = new Blog(body);
    const result = await blog.save();
    res.status(200).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
    const item = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json(item);
});

blogsRouter.put('/:id', async (req, res) => {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body,  { new: true });
    res.json(updated);
});

module.exports = blogsRouter;