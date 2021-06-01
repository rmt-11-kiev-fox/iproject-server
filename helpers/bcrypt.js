const bcrypt = require("bcryptjs");

const randomizePassword = (password) => {
    let output = bcrypt.hashSync(password, 8);
    return output;
};

const checkingPassword = (passwordInput, passwordDataBase) => {
    return bcrypt.compareSync(passwordInput, passwordDataBase);
};

module.exports = {
    randomizePassword,
    checkingPassword,
};
