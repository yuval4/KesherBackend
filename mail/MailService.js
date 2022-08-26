const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const { welcomeMail } = require("../mail/WelcomeMail");
const { resetPasswordMail } = require("./ResetPasswordMail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config();

const sendWelcomeMail = async (email, name, password) => {
  try {
    await sgMail.send(welcomeMail(email, name, password));
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

const sendResetPasswordMail = async (email, name, password) => {
  try {
    await sgMail.send(resetPasswordMail(email, name, password));
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

module.exports = { sendWelcomeMail, sendResetPasswordMail };
