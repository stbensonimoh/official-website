import React from "react"
import Header from "../components/Header"
import Button from "../components/Button"
import { MdArrowForward } from "react-icons/md"

const About = () => {
  return (
    <div>
      <div>
        <Header />
        <div>
          <img src="images/about-page-picture.png" />
          <div>
            <h1>
              Experience Designer<span>.</span>
              <br />
              Software Engineer<span>.</span>
              <br />
              Technology Advocate<span>.</span>
            </h1>
            <p>
              I always come up with interesting ways to blend engineering and
              design in efficiently solving everyday problems for individuals
              and businesses that I work with; seeking smarter and newer ways to
              do old things while saving time and resources at the same time.
            </p>
            <p>
              Highly skilled at design systems, automation, and customer
              experience (CX) engineering.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h1>Over the past years,</h1>
            <p>
              I have helped to design and build great products, processes,
              services, and teams for companies and individuals. I helped them
              to win customers by solving complex user experience problems, from
              improving sales communications to designing customer onboarding. I
              do all these by considering moments of engagement, or touch-points
              between people and brands, and the ideas, emotions, and memories
              that these moments create. In the process, I create culturally
              relevant solutions, with a focus on the quality of user experience
              and I automate the boring stuff.
            </p>

            <p>
              I am currently the Consultant Chief Technology Officer of the
              Nyuma Harrison Foundation (NHF) - a Zambian Not-for-profit focused
              on making healthcare accessible to children in underserved
              communities in Zambia.
            </p>

            <p>
              Before that, in 2017, I worked full-time with the African Women in
              Leadership Organisation - an international not-for-profit
              committed to changing the narrative of leadership in Africa, where
              I spent my time developing innovative products, managing the
              technical strategy, maximizing efficiency, and coordinating the
              various teams, operations, and individuals - in a stint that
              lasted until November 2020.
            </p>
          </div>
          <div>
            <p>At AWLO I:</p>
            <ul>
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
                {" "}
                created value across the organization's strategic business units
                across 12 countries through the facilitation of innovative
                technology solutions to power processes and drive digital
                campaigns.
              </li>
              <li>
                {" "}
                initiated a technology internship program with resulting
                internal and external career placements for the candidates.
              </li>
              <li>
                {" "}
                designed and created a fully automated Volunteers Management and
                onboarding system for the AWLC held in 10 countries.
              </li>
            </ul>

            <p>
              I have stayed true to my creative inclinations by contributing to
              Open Source projects and always working on personal projects. I
              built a drug bot that reminds people to take their medications in
              friendly and customized SMS and email messages. I also support
              causes that bring access to justice and social good for
              communities by volunteering my time and skills at fledgling and
              established not-for-profits like Hope Behind Bars Africa - where I
              built the "Connect Lawyer" app to help indigent prison inmates
              find legal representation by connecting them with experienced and
              qualified pro bono lawyers - and TGIU Africa where they use
              technology to efficiently power the free distribution of sanitary
              towels.
            </p>
            <p>
              I am a realist with a leaning towards optimism. I am a big
              believer in Midwestern work ethic. I choose books over movies 9
              times out of 10 and try to find time to write and blog about
              productivity hacks, automation, and business.
            </p>
            <p>
              I am passionate about technology, engineering, design, and
              education.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h1>I build and design stuff</h1>
            <p>Web Apps, personal projects and experiments</p>
            <Button to="/projects">
              See my work &nbsp;
              <MdArrowForward />
            </Button>
          </div>
          <div>
            <h1>I write too, sometimes</h1>
            <p>
              About technology, design, engineering, productivity and business
            </p>
            <Button to="/blog">
              Read my Blog &nbsp;
              <MdArrowForward />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
