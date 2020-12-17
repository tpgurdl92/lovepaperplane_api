import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mg from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  var result = Math.floor(Math.random() * 1000000) + 100000;
  if (result > 1000000) {
    result = result - 100000;
  }
  return result;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const nodemailerMailgun = nodemailer.createTransport(mg(options));
  return nodemailerMailgun.sendMail(email, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`Response:${info}`);
    }
  });
};
export const sendSecretMail = (address, secret) => {
  const email = {
    from: "tpgurdl92@gmail.com",
    to: address,
    subject: "Login Secret for lovepaperplane",
    html: `hello your login secret is <strong>${secret}</strong>`,
  };
  return sendMail(email);
};
