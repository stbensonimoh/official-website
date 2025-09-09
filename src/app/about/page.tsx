import { Metadata } from "next";
import Image from "next/image";
import Button from "@/app/components/Button";
import { MdArrowForward } from "react-icons/md";
import { roboto } from "@/app/fonts";

export const metadata: Metadata = {
  title: "About - Benson Imoh,ST",
  description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
  openGraph: {
    url: "https://stbensonimoh.com/about",
    title: "About - Benson Imoh,ST",
    description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
    images: [
      {
        url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
        width: 1500,
        height: 1500,
        alt: "Benson Imoh,ST",
      },
    ],
    siteName: "Benson Imoh,ST",
  },
  twitter: {
    creator: "@stbensonimoh",
    card: "summary_large_image",
    title: "Benson Imoh,ST",
    description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
    images: {
      url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
      alt: "Benson Imoh, ST's Logo",
    },
  },
};

export default function About() {
  return (
    <div className="flex flex-col">
      <div className="w-full xl:h-screen">
        <div className="flex flex-col pt-20 md:pt-0 xl:pt-32 pb-12 lg:pb-0 lg:flex-row items-center justify-center">
          <Image
            src="/images/about-page-picture.png"
            alt="Benson Imoh - About page profile picture"
            width={400}
            height={500}
            priority
            className="px-10 md:ml-16 mt-20 mb-9 md:mt-0 xl:w-2/7 lg:w-2/5 md:w-2/3 w-auto h-auto"
          />
          <div className="mx-10 lg:mx-16 lg:w-2/5 text-center lg:text-left">
            <h1
              className={`${roboto.className} text-3xl lg:text-4xl xl:text-5xl font-medium leading-none`}
            >
              Software Engineer<span className="text-primary">.</span>
              <br />
              DevOps Enthusiast<span className="text-primary">.</span>
              <br />
              OSS Advocate<span className="text-primary">.</span>
            </h1>
            <p className="hidden md:flex my-4 font-roboto">
            I like finding smart ways to blend engineering and design to solve real problems—whether it is helping individuals work faster or helping teams build better systems. I am always looking for newer, simpler ways to do old things, especially when it means saving time, cutting friction, or unlocking something better.

I care a lot about open source and automation.
            </p>
            <p className="hidden lg:flex text-secondary font-roboto">
            Deeply invested in improving DevX, Cx, and xD because how things feel is just as important as how they work.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex-row px-12 py-20 items-center bg-bensonpink xl:h-screen text-white font-roboto">
        <div className="md:mx-10 font-roboto lg:w-1/2">
          <h1
            className={`${roboto.className} text-6xl font-medium md:w-2/3 py-8 md:py-8`}
          >
            Over the past years,
          </h1>
          <p className="my-4">
          I have designed and built products, systems, teams, and processes that help people solve real problems efficiently, creatively, and at scale. From simplifying onboarding to refining sales flows, I focus on user experience at every touchpoint: what people see, feel, and remember. Then I find ways to automate the boring stuff so teams can focus on what really matters.
          </p>

          <p className="my-4">
          Currently, I serve as the <strong>Associate Director of Engineering</strong> at <a href="https://350.org" target="_blank">350.org</a> - a global climate movement leveraging technology to drive meaningful action. I lead a distributed team of engineers, building infrastructure and platforms that scale our mission: solving the climate crisis by empowering people worldwide.
          </p>

          <p className="my-4">
          Beyond my professional role, I am deeply involved in the open-source community. As a volunteer with <a href="https://oscafrica.org/" target="_blank">Open Source Community Africa (OSCA) </a>, I contribute to fostering a vibrant ecosystem of open-source contributors across the continent. I am part of the organizing team for the annual <a href="https://festival.oscafrica.org/" target="_blank">Open Source Festival - <strong>OSCAFEST</strong></a> - a high-profile event that brings together developers, designers, and tech enthusiasts to share knowledge, collaborate, and promote open-source tools and practices. I also contribute to <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a> because great documentation helps great developers become even better, and because sharing knowledge is just as important as writing code.
          </p>

          <p>
          On the side, I also try to find time to build interesting tools that I release as open source software. 
          </p>
        </div>
        <div className="md:mx-10 mt-8 md:mt-0 lg:w-1/2">
          <p>Previously, I have worked in various organizations, sometimes in leadership positions:</p>
          <ul className="list-disc ml-8">
            <li>
            <strong>Consultant CTO at Nyuma Harrison Foundation (Zambia):</strong> I helped to bring healthcare access in underserved communities in Zambia through technology solutions.
            </li>
            <li>
            <strong>Chief Technology Officer at African Women in Leadership Organisation:</strong> I designed, built and deployed the organisation's cloud infrastructure, led DevOps adoption, powered digital campaigns across 12 countries, initiated a tech internship program, and secured strategic UN partnerships.
            </li>
            <li>
            <strong>Volunteer at Hope Behind Bars Africa:</strong> Developed the "Connect Lawyer" app to connect prison inmates with pro bono legal assistance.
            </li>
          </ul>

          <p className="my-4">
          I am passionate about technology, automation, and building tools that help people do more with less. Lately, I have been experimenting with creatively adding AI to the mix.
          </p>
          <p>
            I am a realist with a leaning towards optimism. I am a big believer
            in Midwestern work ethic. I choose books over movies 9 times out of
            10 and try to find time to write and blog about productivity hacks,
            automation, and business.
          </p>
        </div>
      </div>
      <div
        className="flex flex-col lg:flex-row items-center justify-center xl:h-screen pt-12 bg-surface"
      >
        <div className="bg-background px-10 lg:px-10 pt-12 pb-20 md:pt-20 lg:pb-32 w-10/12 lg:w-1/3">
          <h1
            className={`${roboto.className} text-4xl md:text-5xl font-medium text-primary w-full`}
          >
            I design and build stuff
          </h1>
          <p className="md:text-2xl my-10 text-secondary w-12/12">
            Web Apps, freelance projects, personal projects and experiments
          </p>
          <Button
            type="external"
            href="https://github.com/stbensonimoh"
            target="_blank"
          >
            See my work &nbsp;
            <MdArrowForward />
          </Button>
        </div>
        <div className="flex  flex-col bg-background px-10 lg:px-10 pt-12 pb-20 my-20 mt-10 md:mt-20 md:pt-20 lg:pb-32 w-10/12 lg:w-1/3">
          <h1
            className={`${roboto.className} text-4xl md:text-5xl font-medium text-primary w-12/12`}
          >
            I write too, sometimes
          </h1>
          <p className="md:text-2xl my-8 md:my-10 text-secondary w-11/12">
            About OSS, design, engineering and productivity.
          </p>
          <Button type="internal" href="/blog">
            Read my Blog &nbsp;
            <MdArrowForward />
          </Button>
        </div>
      </div>
    </div>
  );
}
