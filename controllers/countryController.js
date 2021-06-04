const { Country } = require('../models')

class CountryController {
    static getAllCountries (req, res, next){
        console.log('masuk');
        Country.findAll()
            .then((countries) => {
                res.status(200).json(countries)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CountryController