import "dotenv/config"
import { Client } from "node-mailjet"

const mailjet = new Client({
  apiKey: process.env.GATSBY_MAILJET_APIKEY_PUBLIC,
  apiSecret: process.env.GATSBY_MAILJET_APIKEY_PRIVATE,
})

export default async (req, res) => {
  if (req.method === "POST") {
    const contactEmail = req.body.email

    const request = mailjet.get("contact").id(contactEmail).request()

    request
      .then(result => {
        if (result.body.Count === 1) {
          res.status(200).json({ msg: "already subscribed" })
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          res.status(404).json({ msg: "subscriber not found" })
        }
      })
  }
}
