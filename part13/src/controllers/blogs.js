const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.send(blogs);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByPk(id);
  if (blog) {
    return res.send(blog);
  } else {
    return res.status(404).send({ message: 'Blog not found' });
  }
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.send(blog);
  } catch {
    return res.status(400).send({ message: 'Bad request' });
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
  }
  return res.status(200).send({ message: 'Removed' });
});

module.exports = router;
