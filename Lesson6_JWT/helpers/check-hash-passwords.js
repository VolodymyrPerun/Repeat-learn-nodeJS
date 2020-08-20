const bcrypt = require('bcrypt')

module.exports = async (hashedPassword, password) => {
    const isPasswordsEquals = await bcrypt.compare(password, hashedPassword);

    console.log('*************************************');
    console.log(isPasswordsEquals);
    console.log('*************************************');

    if (!isPasswordsEquals) {
        throw new Error('auth is not exist');
    }
}
