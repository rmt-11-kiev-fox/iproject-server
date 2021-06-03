const axios = require("../api/axios");
const { User } = require("../models");
var request = require("request");

class OngkirController {
  static async getCityHandler(req, res, next) {
    try {
      const getRes = await axios({
        url: "/city",
        method: "GET",
        headers: {
          key: process.env.API_KEY,
        },
      });

      res.status(200).json(getRes.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "internal server error" });
    }
  }

  static async getOngkirHandler(req, res, next) {
    try {
      const { location } = await User.findOne({
        where: {
          id: req.params.userId,
        },
      });

      const data = {
        origin: "" + location,
        destination: req.query.destination,
        weight: 1500,
        courier: req.query.courier,
      };

      var options = {
        method: "POST",
        url: "https://api.rajaongkir.com/starter/cost",
        headers: {
          key: process.env.API_KEY,
          "content-type": "application/x-www-form-urlencoded",
        },
        form: data,
      };

      request(options, function (error, response, body) {
        if (error) res.status(500).json({ msg: "internal server error" });

        res.status(200).json(JSON.parse(body).rajaongkir.results[0]);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "internal server error" });
    }
  }
}

module.exports = OngkirController;
