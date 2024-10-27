"use client";
import { useState } from "react";
import SocialIcons from "@/app/components/SocialIcons";
import Copyright from "@/app/components/Copyright";
import Button from "@/app/components/Button";
import { FiSend } from "react-icons/fi";
import Swal from "sweetalert2";
import { roboto } from "@/app/fonts";

export default function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleContactName = (e) => setContactName(e.target.value);
  const handleContactEmail = (e) => setContactEmail(e.target.value);
  const handleContactMessage = (e) => setContactMessage(e.target.value);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await fetch(`/api/sendemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send the message. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to send the message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <div
        className={`${roboto.className} flex flex-col pt-20 w-full justify-center items-center md:hidden`}
      >
        <img src="images/contact-vector.png" className="my-20 mb-8" />
        <p className="text-center mx-10 mb-8">
          Got a question or proposal, or just want to say hello? Go ahead.
        </p>
        <SocialIcons className="mb-4 social-icons flex flex-row text-center text-bensonpink" />
        <Button type="external" href="mailto:benson@stbensonimoh.com">
          Send me a mail
        </Button>
      </div>
          <div className={`${roboto.className} hidden md:flex flex-col h-screen`}>
        <div className="main flex flex-col items-center justify-center mt-12">
          <h1 className="font-medium text-6xl text-bensonpink">
            Send me a message
          </h1>
          <p className="text-2xl my-6 w-5/12 text-center">
            Do you have a question, a project you’d like to have me on, or just
            want to say hi?
          </p>
          <form className="contact-form flex flex-col w-3/4 items-center mt-14">
            <div className="row flex w-full">
              <div className="column w-1/2 px-12">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  id="name"
                  onChange={handleContactName}
                />
              </div>
              <div className="column w-1/2 px-12">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  onChange={handleContactEmail}
                  id="email"
                />
              </div>
            </div>
            <div className="row my-14 w-full">
              <div className="column w-full px-12">
                <label htmlFor="message">Your message</label>
                <textarea
                  rows="2"
                  onChange={handleContactMessage}
                  placeholder="Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?"
                  id="message"
                ></textarea>
              </div>
            </div>
            <div>
              <Button onClick={handleSendEmail}>
                Send &nbsp; <FiSend />
              </Button>
            </div>
          </form>
        </div>
        <SocialIcons className="absolute bottom-10 social-icons flex flex-col w-8 ml-4 text-center text-bensongrey" />
        <div className="flex justify-center pt-20 pb-8">
          <div className="copyright-container relative text-sm text-bensongrey">
            <Copyright />
          </div>
        </div>
      </div>
    </>
  );
}
