import Image from "next/image";
import SocialIcons from "@/app/components/SocialIcons";
import Copyright from "@/app/components/Copyright";
import Button from "@/app/components/Button";
import { FiSend } from "react-icons/fi";
import { roboto } from "@/app/fonts";

export default function Contact() {
  return (
    <>
      <div
        className={`${roboto.className} flex flex-col pt-20 w-full justify-center items-center md:hidden`}
      >
        <Image 
          src="/images/contact-vector.png" 
          alt="Contact illustration vector"
          width={300}
          height={300}
          className="my-20 mb-8 w-auto h-auto"
        />
        <p className="text-center mx-10 mb-8">
          Got a question or proposal, or just want to say hello? Go ahead.
        </p>
        <SocialIcons className="mb-4 social-icons flex flex-row text-center text-bensonpink" />
        <Button type="external" href="mailto:benson@stbensonimoh.com">
          Send me a mail
        </Button>
      </div>
      <div className={`${roboto.className} hidden md:flex flex-col`}>
        <div className="main flex flex-col items-center justify-center mt-12">
          <h1 className="font-medium text-6xl text-bensonpink">
            Send me a message
          </h1>
          <p className="text-2xl my-12 w-5/12 text-center">
            Do you have a question, a project you’d like to have me on, or just
            want to say hi?
          </p>

          <div className="xl:my-28">
            <Button type="external" href={`mailto:benson@stbensonimoh.com`}>
              Send a message &nbsp; <FiSend />
            </Button>
          </div>
        </div>
        <SocialIcons className="absolute bottom-10 social-icons flex flex-col w-8 ml-4 text-center text-bensongrey" />
        <div className="flex justify-center pt-20 pb-8">
          <div className="copyright-container absolute bottom-8 right-24 text-sm text-bensongrey">
            <Copyright />
          </div>
        </div>
      </div>
    </>
  );
}
