const router = require("express").Router();
const Controller = require("../controllers/MusicController");

router.post("/search", Controller.searchMusic);
router.post("/lyrics", Controller.searchLyrics);

module.exports = router;
