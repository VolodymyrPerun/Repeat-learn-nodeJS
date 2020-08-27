const bcrypt = require('bcrypt');

module.exports = async (password) => {
    return bcrypt.hash(password, 10)
}
