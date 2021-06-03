const bcrypt = require('bcryptjs');

const encode = (password) => {
	return bcrypt.hashSync(password, 8);
};

const decode = (password, hashedPassword) => {
	return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { encode, decode };
