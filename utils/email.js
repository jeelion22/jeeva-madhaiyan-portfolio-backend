const nodemailer = require("nodemailer");

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PWD,
  RECIEVER_EMAIL,
} = require("./config");

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  post: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PWD,
  },
});

const sendEmail = async (message) => {
  try {
    const info = await transporter.sendMail({
      from: `Portfolio View Alerter <${EMAIL_USERNAME}>`,
      to: RECIEVER_EMAIL,
      subject: "Portfolio Visitor Alert ⚠️",
      html: message,
    });

    console.log("Alert sent");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendEmail };
