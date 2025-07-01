require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_PWD = process.env.EMAIL_PWD;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const RECIEVER_EMAIL = process.env.RECIEVER_EMAIL;

module.exports = {
  MONGODB_URI,
  PORT,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_PWD,
  EMAIL_USERNAME,
  RECIEVER_EMAIL,
};
