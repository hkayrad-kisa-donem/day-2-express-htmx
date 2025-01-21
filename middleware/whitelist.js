const whitelist = (req, res, next) => {
    const whitelist = ['127.0.0.1', 'localhost', '::1', '::ffff:127.0.0.1'];

    if (whitelist.indexOf(req.connection.remoteAddress) !== -1) {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
};

module.exports = whitelist;