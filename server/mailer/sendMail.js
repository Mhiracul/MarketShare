var nodemailer = require("nodemailer");
var { emailTemplate } = require("./template");
var { emailTemplate2 } = require("./alltemplate");

const host = "marketsharestore.com";
const port = 465;
const supportMail = "info@marketsharestore.com";
const pass = "marketsharestore.com1";

// const host = "server267.web-hosting.com";
// const port = 465;
// const supportMail = "test@iflsc.com";
// const pass = "IFLSC2341#";

let transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: supportMail,
    pass: pass,
  },
});

const verifyMail = (Email, Token) => {
  try {
    var mailOptions = {
      from: ` "Marketshare Verify" <${supportMail}>`,
      to: Email,
      subject: "Verification",
      html: `<p> Marketshare Email Verification <br/> <b> Use the token below  <b/>  <br/>  <b> ${Token} </b>  </p>`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

const forgotPasswordMail = (Email, OTP) => {
  try {
    var mailOptions = {
      from: ` "Marketshare Verify" <${supportMail}>`,
      to: Email,
      subject: "[Marketshare Verification]",
      html: emailTemplate2(`<b>Hello, <b/>Please use this OTP : ${OTP}`),
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error("Error in sending email:", error);
  }
};

const sendLoggedInMail = (Email) => {
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getUTCDate() +
    "/" +
    currentdate.getUTCMonth() +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  try {
    var mailOptions = {
      from: ` "MarketShare Login"  <${supportMail}>`,
      to: Email,
      subject: "MarketShare Login",
      html: emailTemplate(
        `<b> Your account had been logged in  <br/> <br/>  <b> Time -- ${datetime}. </b>`
      ),
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

const sendWelcomeMail = (Email, OTP) => {
  try {
    var mailOptions = {
      from: ` "MarketShare[Welcome]" <${supportMail}>`,
      to: Email,
      subject: "Greetings[MarketShare]",
      html: emailTemplate(
        `Greetings, please enter this OTP: ${OTP} for verification.  `
      ),
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

const sendPaymentReport = (Email) => {
  try {
    var mailOptions = {
      from: ` "Marketshare Payment" <${supportMail}>`,
      to: Email,
      subject: "[Marketshare Payment Doc]",
      html: emailTemplate2(`<b>Find Attachment Below <b/>`),
      attachments: [
        {
          // file on disk as an attachment
          filename: "x3_receipt.pdf",
          path: "payment_slips/x3_receipt.pdf", // stream this file
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

const sendWarningMail = (Email, Text) => {
  try {
    var mailOptions = {
      from: ` "MarketShare[Warning]" <${supportMail}>`,
      to: Email,
      subject: "Warning[MarketShare]",
      html: emailTemplate(` ${Text} `),
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

const sendSanctionMail = (Email, Text) => {
  try {
    var mailOptions = {
      from: ` "MarketShare[Sanction]" <${supportMail}>`,
      to: Email,
      subject: "Sanction[MarketShare]",
      html: emailTemplate(` ${Text} `),
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) throw err;

      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  verifyMail,
  forgotPasswordMail,
  sendWelcomeMail,
  sendLoggedInMail,
  sendPaymentReport,
  sendSanctionMail,
  sendWarningMail,
};
