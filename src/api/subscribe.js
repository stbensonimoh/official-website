import "dotenv/config"
import { Client } from "node-mailjet"
const mailjet = new Client({
  apiKey: process.env.GATSBY_MAILJET_APIKEY_PUBLIC,
  apiSecret: process.env.GATSBY_MAILJET_APIKEY_PRIVATE,
})

export default async (req, res) => {
  if (req.method === "POST") {
    const contact = req.body
    console.log(contact)

    const request = mailjet
      .post("contactslist", { version: "v3" })
      .id("11271")
      .action("managemanycontacts")
      .request({
        Action: "addnoforce",
        Contacts: [
          {
            Email: contact.email,
            IsExcludedFromCampaigns: "false",
            Properties: { Name: contact.name },
          },
        ],
      })
    request
      .then(result => {
        console.log(result.body)
        res.status(201).json({ msg: "successfully subscribed" })
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    res.status(200).json({ message: "Hello! This is the /subscribe endpoint" })
  }
}
