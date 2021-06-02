const { Baby, Boy, Girl, Kid, Men, Women } = require('../models')

const nodemailer = require('nodemailer')
const getResult = require('../helpers/getResult')
const interestResult = require('../helpers/interestResult')
const shuffle = require('../helpers/shuffle')
const { default: axios } = require('axios')

class Controller {
  static dashboard(req, res) {
    res.send('Individual Project Phase 2 server is running!')
  }

  static async result(req, res) {
    const data = req.query
    let finalResults
    let interest_results

    if (data.age_group === 'Baby') {
      finalResults = await getResult(Baby, 8)
    } else if (data.age_group === 'Kid') {
      finalResults = await getResult(Kid, 8)
    } else if (data.age_group === 'Young Adult' || data.age_group === 'Adult') {
      if (data.age_group === 'Young Adult') {
        if (data.gender === 'Male') {
          finalResults = await getResult(Boy, 4)
        } else if (data.gender === 'Female') {
          finalResults = await getResult(Girl, 4)
        } else {
          finalResults = 'invalid'
        }
      } else if (data.age_group === 'Adult') {
        if (data.gender === 'Male') {
          finalResults = await getResult(Men, 4)
        } else if (data.gender === 'Female') {
          finalResults = await getResult(Women, 4)
        } else {
          finalResults = 'invalid'
        }
      } else {
        finalResults = 'invalid'
      }
      interest_results = await interestResult(data.interest, 4)
    } else {
      finalResults = 'invalid'
    }

    if (finalResults !== 'invalid' && interest_results !== 'invalid') {
      if (!interest_results) {
        res.status(200).json(finalResults)
      } else {
        res.status(200).json(shuffle(finalResults.concat(interest_results)))
      }
    } else {
      res.status(400).json({
        message: 'Input invalid!',
      })
    }
  }

  static sendEmail(req, res) {
    // Generate refresh token : https://developers.google.com/oauthplayground
    var transporter = nodemailer.createTransport({
      pool: true,
      service: 'gmail',
      secure: false,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    transporter.verify((error, success) => {
      if (error) {
        return console.log(error)
      }
      transporter.on('token', (token) => {
        console.log('User: %s', token.user)
        console.log('Expires: %s', new Date(token.expires))
      })
    })
    var mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL,
      subject: `Message about GeeHive from ${req.body.fullname}`,
      text: req.body.message,
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw res.status(500).json(err.response)
      res.status(201).json('Email sent: ' + info.response)
    })
  }

  static exchangeRate(req, res) {
    axios({
      url: `https://free.currconv.com/api/v7/convert?q=USD_IDR&compact=ultra&apiKey=${process.env.API_KEY}`,
      method: 'GET'
    })
    .then(response => {
      res.status(200).json({USD_IDR: response.data.USD_IDR})
    })
    .catch(err => {
      console.log(err);
      // Invalid API key
      res.status(400).json(err.response.data.error)
    })
  }
}

module.exports = Controller
