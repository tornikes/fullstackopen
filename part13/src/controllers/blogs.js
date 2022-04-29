const router = require('express').Router();

const { Blog, User } = require('../models');

const { BadRequestError, NotFountError } = require('../errors');
const tokenExtractor = require('../middleware/tokenExtractor');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
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

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.send(blog);
  } catch {
    throw new BadRequestError();
  }
});

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);

  if (!user) {
    throw new BadRequestError('Unknown user');
  }
  const blog = await Blog.findByPk(req.params.id);
  if (blog && user.id === blog.userId) {
    await blog.destroy();
  } else {
    throw new BadRequestError();
  }
  return res.status(200).send({ message: 'Removed' });
});

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    throw new NotFountError();
  }
  blog.likes = Number(req.body.likes);
  await blog.save();
  res.send({ blog });
});

module.exports = router;
