const { YTSearcher } = require("ytsearcher");
const searcher = new YTSearcher(process.env.YOUTUBE_API);
const axios = require("axios");

class Controller {
    static async searchMusic(req, res, next) {
        try {
            const { searchDetails } = req.body;
            let ytSearch = await searcher.search(searchDetails);
            res.status(200).json({ results: ytSearch.currentPage });
        } catch (error) {
            console.log(error, "ini yt error");
            next(error);
        }
    }

    static async searchLyrics(req, res, next) {
        try {
            const { artist, title } = req.body;
            let findLyrics = await axios({
                method: "get",
                url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
            });
            if (findLyrics) res.status(200).json(findLyrics.data);
        } catch (error) {
            console.log(error, "ini di searchLyrics");
            next(error);
        }
    }
}

module.exports = Controller;
