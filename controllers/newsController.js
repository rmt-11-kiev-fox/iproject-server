const axios = require('axios')

class NewsController {
    static getNews (req, res, next) {
        // console.log('masukk');
        const teamName = req.query.teamName
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
            params: {
              q: teamName + ' fc',
              pageNumber: '1',
              pageSize: '10',
              autoCorrect: 'true',
              fromPublishedDate: 'null',
              toPublishedDate: 'null'
            },
            headers: {
              'x-rapidapi-key': '7b23347803msh90998a16cc14991p16a77djsne36f34b34203',
              'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
          };
          axios.request(options)
            .then(({ data }) => {
                res.status(200).json(data.value)
            }).catch(err => {
                next(error);
            });
    }
}

module.exports = NewsController