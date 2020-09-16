const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs');
    res.status(200).json(users);
});

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('blogs');
    res.status(200).json(user);
});

usersRouter.post('/', async (req, res, next) => {
    const body = req.body;
    if (!body.password || body.password < 3) {
        return res.status(400).json({
            error: 'password must be at least 3 characters long'
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const nextUser = {
        username: body.username,
        name: body.name,
        passwordHash
    };
    try {
        const user = new User(nextUser);
        await user.save();
        res.status(201).json(user);
    } catch (ex) {        
        next(ex);
    }
});

module.exports = usersRouter;