const router = require('express').Router();

const { User, Blog } = require('../models');
const { BadRequestError, NotFountError } = require('../errors');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.send(users);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch {
    throw new BadRequestError();
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (!user) {
    throw new NotFountError('User not found');
  }

  const anotherUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (anotherUser) {
    throw new BadRequestError('Username is already taken');
  }

  user.username = req.body.username;
  await user.save();
  res.send(user);
});

module.exports = router;
