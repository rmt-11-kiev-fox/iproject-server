const axios = require("axios");

module.exports = class covidController {
	static fetchAll(req, res) {
		axios({
			method: "GET",
			url: "https://lintangwisesa.github.io/Indonesia-Covid19-Maps/data/provinsi/all.json",
		})
			.then(({ data }) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json({ message: err.response.data.message });
			});
	}
};
