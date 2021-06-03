const axios = require("axios");

const instance = axios.create({
  baseURL: "http://api.rajaongkir.com/starter",
});

module.exports = instance;
