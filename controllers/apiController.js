const axios = require('axios')

class apiController {
  static async fetchFoodApi (req, res, next) {
    try {
      const q = req.params.q // utama ini
      const r = req.body.r

      console.log('--------------------------------', q ,'------------------------------------------');

      const options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: { r, q },
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        res.status(200).json(response.data)
      }).catch(function (error) {
        console.error(error);
      });

    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500

      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }
  
  static async fetchRandomQuotes (req, res, next) {
    try {
      const options = {
        method: 'POST',
        url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'motivational-quotes1.p.rapidapi.com'
        },
        data: {key1: 'fitness', key2: 'gym'}
      };

      axios.request(options).then(function (response) {
        let quote = response.data
        quote = quote.substring(1)
        quote = quote.split('.\"\n')
        quote = {
          quote: quote[0],
          author: quote[1]
        }

        res.status(200).json(quote)
      }).catch(function (error) {
        console.error(error);
      });

    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }

  static async fetchBMI (req, res, next) {
    try {
      
      let weight = req.body.weight
      let height = req.body.height

      if (weight < 20 || height >= 300 || height <= 60) {
        throw { name: 'validationError', msg: `Weight must not be less than 20 kg and height must not be more than 300 cm or less than 60 cm`}
      }
      else {
        height = height / 100

        const options = {
          method: 'GET',
          url: 'https://body-mass-index-bmi-calculator.p.rapidapi.com/metric',
          params: { weight, height },
          headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
            'x-rapidapi-host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
          }
        };
  
        axios.request(options).then(function (response) {
          if (response.data.bmi <= 18) {
            response.data.weightCategory = 'underweight'
          }
          else if (response.data.bmi <= 25) {
            response.data.weightCategory = 'normal'
          }
          else if (response.data.bmi <= 30) {
            response.data.weightCategory = 'overweight'
          }
          else if (response.data.bmi <= 35) {
            response.data.weightCategory = 'obese'
          }
          else if (response.data.bmi > 35) {
            response.data.weightCategory = 'extremely obese'
          }
          res.status(200).json(response.data)
        }).catch(function (error) {
          console.error(error);
        });
      }

    } catch (error) {
      let errorName = 'ServerError'
      let listOfErrors = error
      let errorCode = 500

      if (error.name == 'validationError') {
        listOfErrors = error.msg
        errorCode = 400
      }
    
      next({
        name: errorName,
        msg: listOfErrors,
        code: errorCode
      })
    }
  }
}

module.exports = apiController