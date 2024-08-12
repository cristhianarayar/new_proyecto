const bcrypt = require('bcryptjs');

const encryptHashPassword = async (password) => {
    const passEncrypt = await bcrypt.hash(String(password), 12)
    return passEncrypt
}


const verifyPasswordEncrypt = async (password, passEncrypt) => {
    const match = await bcrypt.compare(String(password), passEncrypt);
    return match
}


module.exports = {
    encryptHashPassword,
    verifyPasswordEncrypt
}