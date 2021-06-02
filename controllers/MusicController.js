const { YTSearcher } = require("ytsearcher");
const searcher = new YTSearcher(process.env.YOUTUBE_API);

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
}

module.exports = Controller;
