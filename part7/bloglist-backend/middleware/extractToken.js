function extractToken(req, _, next) {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.body.token = authorization.substring(7);
    }
    return next();
}

module.exports = {
    extractToken
};