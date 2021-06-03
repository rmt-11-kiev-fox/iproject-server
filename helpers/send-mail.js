const nodemailer = require('nodemailer');

function sendMail(email) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'makanologyh8@gmail.com',
        pass: 'hacktiv8kiev'
      }
    });
  
    let mailOptions = {
      from: 'makanologyh8@gmail.com',
      to: email,
      subject: 'BOOKING SUCCESS!',
      text: `Thankyou for booking! our staff will contact you soon to inform you about our availability`
    };
  
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
    });
  }

module.exports = sendMail