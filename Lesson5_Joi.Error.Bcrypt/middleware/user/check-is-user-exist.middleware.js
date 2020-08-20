const {userService} = require("../../service");
module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params
        if (isNaN(userId) || +userId < 0) {
            return res.status(400).json({message: 'user id is not valid'})
        }

        const  user = await userService.getUserById(userId)

        if (!user) {
            return req.status(404).json({message: 'user not found'})
        }

        req.user = user

        next()
    } catch (e) {
        res.json({error: e.message})
    }
}
