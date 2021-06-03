const { User } = require("../models");
const { decode } = require("../helpers/bcryptjs");
const { sign } = require("../helpers/jwt");

module.exports = class userController {
	static register(req, res) {
		let { email, password } = req.body;
		let newUser = {
			email,
			password,
		};

		User.create(newUser)
			.then(() => {
				res.status(201).json({ message: "Thank You For Joining Us! You are pierceious" });
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	}

	static login(req, res) {
		let { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: "Sorry, It seems you haven't input the email or password field" });
		} else {
			User.findOne({ where: { email } })
				.then((data) => {
					if (data) {
						if (decode(password, data.password)) {
							let { id, email, role } = data;
							let access_token = sign({ id, email, role });
							res.status(200).json({ access_token });
						} else {
							res.status(400).json({ message: "Sorry, It seems your email or password maybe wrong" });
						}
					} else {
						res.status(400).json({ message: "Sorry, It seems you haven't join with us yet" });
					}
				})
				.catch((err) => {
					res.status(500).json({ message: err.message });
				});
		}
	}
};
