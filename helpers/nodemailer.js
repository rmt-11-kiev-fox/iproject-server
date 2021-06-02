function sendEmail(to, subject, text) {
  let nodemailer = require("nodemailer");
  // require('dotenv').config()

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      type: "login",
      user: "dahayusite@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: "dahayusite@gmail.com",
    to: `${to}`,
    subject: `${subject}`,
    text: `${text}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw err;
    } else {
      return `Email sent: ${info.response}`;
    }
  });
}

function send(to, text) {
  let subject = "Thank you for visiting dahayu site !";
  let email = to;
  let message = text;
  sendEmail(email, subject, message);
}

module.exports = send;
