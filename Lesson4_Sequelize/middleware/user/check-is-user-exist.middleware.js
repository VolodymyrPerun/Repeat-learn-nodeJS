module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params
        if (isNaN(userId) || +userId < 0) throw new Error('User id is not valid')

        next()
    } catch (e) {
        res.json({error: e.message})
    }
}
