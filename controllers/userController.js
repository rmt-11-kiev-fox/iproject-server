const { User, Playlist } = require("../models");
const { checkingPassword, randomizePassword } = require("../helpers/bcrypt");
const { login } = require("../helpers/jwt");

class UserController {
    static async register(req, res) {
        let { username, password } = req.body;
        try {
            const dataRegistered = await User.create({
                username,
                password,
            });
            res.status(201).json({
                id: dataRegistered.id,
                username: dataRegistered.username,
            });
        } catch (error) {
            let output = error.errors.map((el) => el.message);
            res.status(400).json(output);
        }
    }
    static async login(req, res) {
        let { username, password } = req.body;
        try {
            const checkUsername = await User.findOne({
                where: {
                    username,
                },
            });
            if (!checkUsername) {
                res.status(404).json({ message: "username or password wrong" });
            } else {
                if (checkingPassword(password, checkUsername.password)) {
                    res.status(200).json({
                        id: checkUsername.id,
                        access_token: login({
                            id: checkUsername.id,
                            username,
                        }),
                    });
                } else {
                    res.status(404).json({ message: "username or password wrong" });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    static async changePassword(req, res) {
        let usernameTemp = "";
        let migrationFinale = [];
        try {
            const checkUsername = await User.findOne({
                where: {
                    id: req.authentication.id,
                },
            });
            usernameTemp = checkUsername.username;
            let updatedAccount = await User.create({
                username: "dummy",
                password: req.body.password,
            });
            const migrationPlaylist = await Playlist.findAll({
                include: [User],
                where: {
                    UserId: req.authentication.id,
                },
            });
            if (migrationPlaylist.length !== 0) {
                const migration = migrationPlaylist.map((el) => {
                    return {
                        title: el.title,
                        url: el.url,
                        apiId: el.apiId,
                        UserId: updatedAccount.id,
                    };
                });
                migrationFinale = migration;
            }
            const deletePlaylist = await Playlist.destroy({
                where: {
                    UserId: req.authentication.id,
                },
            });
            const deleteCurrentUsername = await User.destroy({
                where: {
                    id: req.authentication.id,
                },
            });
            updatedAccount.username = usernameTemp;
            const updatedAccountFinale = await updatedAccount.save();
            let massiveCreate;
            for (let index = 0; index < migrationFinale.length; index++) {
                massiveCreate = await Playlist.create(migrationFinale[index]);
                massiveCreate = null;
            }
            res.status(200).json({
                message: "data berhasil di update, silahkan login kembali",
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;
