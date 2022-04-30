const router = require('express').Router();
const { Blog, User } = require('../models');

const { Op } = require('sequelize');
const { sequelize } = require('../util/db');

const { BadRequestError, NotFountError } = require('../errors');
const tokenExtractor = require('../middleware/tokenExtractor');

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = {
      title: {
        [Op.iLike]: `%${req.query.search.toLowerCase()}%`,
      },
      author: {
        [Op.iLike]: `%${req.query.search.toLowerCase()}%`,
      },
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'ASC']],
  });
  res.send(blogs);
});

router.get('/authors', async (req, res) => {
  const response = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'number_of_blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes'],
    ],
    group: 'author',
    order: [[sequelize.literal('total_likes'), 'DESC']],
  });

  res.send(response);
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
  } catch (err) {
    console.log(err);
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
