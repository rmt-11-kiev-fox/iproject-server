const router = require("express").Router();
const Controller = require("../controllers/MusicController");

router.post("/search", Controller.searchMusic);

module.exports = router;
