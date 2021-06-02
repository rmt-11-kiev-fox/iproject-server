const axios = require("axios");

module.exports = class mapController {
	static suggestions(req, res) {
		let { lat, lng } = req.body;
		let output = "json";
		let location = `${lat},${lng}`;
		let rankby = "distance";
		let type = "cafe";
		axios({
			method: "GET",
			url: `https://maps.googleapis.com/maps/api/place/nearbysearch/${output}?location=${location}&rankby=${rankby}&type=${type}&key=${process.env.GAPI}`,
		})
			.then(({ data }) => {
				let result = data.results.slice(0, 3);
				res.status(200).json({ result });
			})
			.catch((err) => {
				res.status(500).json({ message: err.response.data.message });
			});
	}

	static nearest(req, res) {
		let { lat, lng } = req.body;
		let output = "json";
		let location = `${lat},${lng}`;
		let radius = "1500";
		let type = "cafe";
		axios({
			method: "GET",
			url: `https://maps.googleapis.com/maps/api/place/nearbysearch/${output}?location=${location}&radius=${radius}&type=${type}&key=${process.env.GAPI}`,
		})
			.then(({ data }) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json({ message: err.response.data.message });
			});
	}
};
