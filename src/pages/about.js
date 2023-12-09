import React from "react"
import Header from "../components/Header"
import Button from "../components/Button"
import { MdArrowForward } from "react-icons/md"
import { HeadSeo } from "gatsby-plugin-head-seo/src"

const About = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full lg:h-screen">
        <Header />
        <div className="flex flex-col pt-20 md:pt-0 pb-12 md:pb-0 md:flex-row items-center justify-center">
          <img
            src="/images/about-page-picture.png"
            className="px-10 md:ml-16 mt-20 mb-9 md:mt-0"
          />
          <div className="mx-10 md:mx-16 md:w-2/5 text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-roboto font-bold leading-tight">
              Experience Designer<span className="text-bensonpink">.</span>
              <br />
              Software Engineer<span className="text-bensonpink">.</span>
              <br />
              OSS Advocate<span className="text-bensonpink">.</span>
            </h1>
            <p className="hidden md:flex my-4">
              I always come up with interesting ways to blend engineering and
              design in efficiently solving everyday problems for individuals
              and businesses that I work with; seeking smarter and newer ways to
              do old things while saving time and resources at the same time.
              I'm enthusiastic about OSS.
            </p>
            <p className="hidden md:flex text-bensongrey">
              Highly skilled in Experience Design(xD), Customer Experience(Cx),
              automation, and Developer Experience(Dx) Engineering.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row px-12 py-20 items-center bg-bensonpink md:h-screen text-white font-roboto">
        <div className="md:mx-10">
          <h1 className="text-6xl font-bold md:w-2/3 py-8 md:py-8">
            Over the past years,
          </h1>
          <p className="my-4">
            I have helped to design and build great products, processes,
            services, and teams for companies and individuals. I helped them to
            win customers by solving complex user experience problems, from
            improving sales communications to designing customer onboarding. I
            do all these by considering moments of engagement, or touch-points
            between people and brands, and the ideas, emotions, and memories
            that these moments create. In the process, I create culturally
            relevant solutions, with a focus on the quality of user experience
            and I automates the boring stuff.
          </p>

          <p className="my-4">
            I am currently the Lead Developer of 350.org - an international
            environmental organization that focuses on addressing climate change
            and promoting sustainable solutions by engaging and empowering
            individuals, communities, and decision-makers to take meaningful
            action on climate change. I am responsible for leading a team of
            developers in the development and maintenance of the organization's
            engineering infrastructure to achieve its mission of building a
            global movement to solve the climate crisis.
          </p>

          <p>
            Before that, in 2017, I worked full-time with the African Women in
            Leadership Organisation - an international not-for-profit committed
            to changing the narrative of leadership in Africa, where I spent my
            time developing innovative products, managing the technical
            strategy, maximizing efficiency, and coordinating the various teams,
            operations, and individuals - in a stint that lasted until November
            2020. Thereafter I worked as the Consultant Chief Technology Officer
            of the Nyuma Harrison Foundation (NHF) - a Zambian Not-for-profit
            focused on making healthcare accessible to children in underserved
            communities in Zambia.
          </p>
        </div>
        <div className="md:mx-10 mt-8 md:mt-0">
          <p>At AWLO I:</p>
          <ul className="list-disc ml-8">
            <li>
              designed and implemented a robust technology infrastructure that
              overhauled the organization's image and earned it strategic UN
              Partnerships.
            </li>
            <li>
              designed and implemented a DevOps culture throughout the
              organization.
            </li>
            <li>
              created value across the organization's strategic business units
              across 12 countries through the facilitation of innovative
              technology solutions to power processes and drive digital
              campaigns.
            </li>
            <li>
              initiated a technology internship program with resulting internal
              and external career placements for the candidates.
            </li>
            <li>
              designed and created a fully automated Volunteers Management and
              onboarding system for the AWLC held in 10 countries.
            </li>
          </ul>

          <p className="my-4">
            I have stayed true to my creative inclinations by actively
            contributing to Open Source projects - something I'm passionate
            about - and working on personal projects. I also supports causes
            that bring access to justice and social good for communities by
            volunteering my time and skills at fledgling and established
            not-for-profits like Hope Behind Bars Africa - where I built the
            "Connect Lawyer" app to help indigent prison inmates find legal
            representation by connecting them with experienced and qualified pro
            bono lawyers.
          </p>
          <p>
            I am a realist with a leaning towards optimism. I am a big believer
            in Midwestern work ethic. I choose books over movies 9 times out of
            10 and try to find time to write and blog about productivity hacks,
            automation, and business.
          </p>
          <p>
            I am passionate about technology, engineering, design, and
            education.
          </p>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center justify-center md:h-screen"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="bg-white px-10 md:px-20 pt-12 pb-20 md:pt-20 md:pb-32 w-10/12 md:w-1/3">
          <h1 className="text-4xl md:text-5xl font-roboto font-bold text-bensonpink w-11/12">
            I build and design stuff
          </h1>
          <p className="md:text-2xl my-10 text-bensongrey w-11/12">
            Web Apps, freelance projects, personal projects and experiments
          </p>
          <Button type="internal" to="/projects">
            See my work &nbsp;
            <MdArrowForward />
          </Button>
        </div>
        <div className="flex  flex-col bg-white px-10 md:px-20 pt-12 pb-20 my-20 mt-10 md:mt-20 md:pt-20 md:pb-32 w-10/12 md:w-1/3">
          <h1 className="text-4xl md:text-5xl font-roboto font-bold text-bensonpink w-11/12">
            I write too, sometimes
          </h1>
          <p className="md:text-2xl my-8 md:my-10 text-bensongrey w-11/12">
            About OSS, technology, design, engineering, productivity and
            business
          </p>
          <Button type="internal" to="/blog">
            Read my Blog &nbsp;
            <MdArrowForward />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default About

export const Head = ({ location }) => {
  return <HeadSeo location={location} />
}
