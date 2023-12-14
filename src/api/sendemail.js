import "dotenv/config"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.GATSBY_MAIL_HOST,
  port: process.env.GATSBY_MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.GATSBY_MAIL_USER,
    pass: process.env.GATSBY_MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export default async (req, res) => {
  if (req.method === "POST") {
    const mail = req.body

    const sendmail = await transporter
      .sendMail({
        from: `${mail.name} <${mail.email}>`,
        to: process.env.GATSBY_MAIL_USER,
        subject: `New Message from ${mail.name} using Website Contact Form`,
        text: mail.message,
        html: `<div>${mail.message}</div>`,
      })
      .then(response => {
        console.log(response)
        res.status(200).json({ msg: "success" })
      })
      .catch(err => console.log(err))
  }
}
