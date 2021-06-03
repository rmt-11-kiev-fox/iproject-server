const axios = require('axios');

// let baseURL = "http://www.reddit.com/search.json"

class Controller {
    static async getDataReddit(req, res) {
      try {
        if (req.query.q) {
          let { data } = await axios({
            url: `http://www.reddit.com/search.json?sort=hot&limit=20&q=${req.query.q}`,
            method: 'GET',
          });
          res.status(200).json(data.data.children[1].data);
        }}
      
        catch(error) {
            console.log(error);
            res.status(500).json({ message: error.message});
        }
    }

    static async getTrendingTwitter(req, res) {
      try {
        if (req.query.query) {
          let { data } = await axios({
            url: `https://api.twitter.com/2/tweets/search/recent?max_results=20&query=${req.query.query}`,
            method: 'GET',
            headers: {
              authorization: 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAAFgkQQEAAAAA5WSfMWEGkZkY0693Qe760mfpcn0%3DDvyI6wrtXLQpXeLIFO7EVwMF9uSKJW9zVXzbuMOJUfxcdD5Smb'
            }
          });
          res.status(200).json(data);
        }}
      
        catch(error) {
            console.log(error);
            res.status(500).json({ message: error.message});
        }
    }
}


module.exports = Controller;