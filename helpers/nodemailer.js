const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: "dahayusite@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (toEmail, data) => {
  const mailOptions = {
    from: "dahayusite@gmail.com",
    to: toEmail,
    subject: "Youre make up list",
    html: `
    <p>You have have some make up list:</p>
    <table
    align="center"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    width="100%"
    style="margin: auto"
  >
    <tr>
      <td
        valign="top"
        class="bg_white"
        style="padding: 1em 2.5em 0 2.5em"
      >
        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <tr>
            <td class="logo" style="text-align: left">
              <h1><a href="#">Make up List</a></h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- end tr -->
    <tr>
      <td
        valign="middle"
        class="hero bg_white"
        style="padding: 2em 0 2em 0"
      >
        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <tr>
            <td style="padding: 0 2.5em; text-align: left">
              <div class="text">
                <h2>Hi there, this is your make up list summary</h2>
                <h3>
                  Dahayu is happy to take part on your make up journey
                </h3>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- end tr -->
    <tr>
      <table
        class="bg_white"
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
      >
        <tr style="border-bottom: 1px solid rgba(0, 0, 0, 0.05)">
          <th
            width="80%"
            style="
              text-align: left;
              padding: 0 2.5em;
              color: #000;
              padding-bottom: 20px;
            "
          >
            Item
          </th>
          <th
            width="20%"
            style="
              text-align: right;
              padding: 0 2.5em;
              color: #000;
              padding-bottom: 20px;
            "
          >
            Tags
          </th>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0, 0, 0, 0.05)">
          <td
            valign="middle"
            width="80%"
            style="text-align: left; padding: 0 2.5em"
          >
            <div class="product-entry">
              <img
                src=${data.image_link}
                alt=""
                style="
                  width: 100px;
                  max-width: 600px;
                  height: auto;
                  margin-bottom: 20px;
                  display: block;
                "
              />
              <div class="text">
                <h3>${data.name}</h3>
                <span>${data.brand}</span>
                <p>
                  ${data.description}
                </p>
              </div>
            </div>
          </td>
          <td
            valign="middle"
            width="20%"
            style="text-align: left; padding: 0 2.5em"
          >
            <span class="price" style="color: #000; font-size: 20px"
              >${data.tag_list}</span
            >
          </td>
        </tr>

        <tr>
          <td
            valign="middle"
            style="text-align: left; padding: 1em 2.5em"
          >
            <p>
              <a href="#" class="btn btn-primary">visit Dahayu</a>
            </p>
          </td>
        </tr>
      </table>
    </tr>
    <!-- end tr -->
    <!-- 1 Column Text + Button : END -->
  </table>`,
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
  });
};

module.exports = sendEmail;
