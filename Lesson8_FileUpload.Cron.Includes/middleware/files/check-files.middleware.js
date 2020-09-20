module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];

    if (!req.docs) {
        next()
    }

    next()
}
