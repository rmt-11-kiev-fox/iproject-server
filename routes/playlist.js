const router = require("express").Router();
const PlaylistController = require("../controllers/playlistController");

router.post("/playlists", PlaylistController.addPlaylist);
router.get("/playlists", PlaylistController.getPlaylist);
router.delete("/playlists/:id", PlaylistController.delete);

module.exports = router;
