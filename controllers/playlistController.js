const { Playlist } = require("../models");

// Class ini akan hanya sample, digunakan hanya untuk latihan
class PlaylistController {
    static async addPlaylist(req, res) {
        const playlistAdded = {
            UserId: req.authentication.id,
            title: req.body.title,
            url: req.body.url,
            apiId: req.body.id,
        };
        try {
            const checkPlaylistInDataBase = await Playlist.findOne({
                where: {
                    apiId: +req.body.id,
                    UserId: +req.authentication.id,
                },
            });
            if (checkPlaylistInDataBase) {
                res.status(400).json({
                    message: "data sudah pernah di input",
                });
            } else {
                const successAdded = await Playlist.create(playlistAdded);
                res.status(201).json(successAdded);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    static async getPlaylist(req, res) {
        try {
            const getDataUserPlaylists = await Playlist.findAll({
                where: {
                    UserId: req.authentication.id,
                },
            });
            res.status(200).json(getDataUserPlaylists);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    static async delete(req, res) {
        try {
            const checkData = await Playlist.findOne({
                where: {
                    id: +req.params.id,
                },
            });
            if (!checkData) {
                res.status(403).json({
                    message: "data tidak ditemukan",
                });
            } else {
                const deletePlaylist = await Playlist.destroy({
                    where: {
                        id: req.params.id,
                    },
                });
                res.status(200).json({
                    message: "data Berhasil di delete",
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = PlaylistController;
