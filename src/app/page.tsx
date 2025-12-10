"use client";

import Copyright from "@/app/components/Copyright";
import SocialIcons from "@/app/components/SocialIcons";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect } from "react";
import { setPageContext } from "@/lib/clarity";

export default function Home() {
  const { actualTheme } = useTheme();
  const boxBgClass = actualTheme === "dark" ? "bg-surface" : "bg-bensonblack";
  
  useEffect(() => {
    setPageContext('home', { page_name: 'landing' });
  }, []);
  
  return (
    <div className="font-roboto">
      <div className="hidden md:flex items-center justify-center mt-12 md:mx-4 xl:mx-0">
        <div className="flex flex-col mx-10 w-1/2 lg:w-1/3">
          <h3 className="text-4xl font-roboto">Hello!</h3>
          <h4 className="text-2xl font-badscript">I am Benson...</h4>
          <h1 className="font-bebas my-4 lg:text-3xl xl:text-5xl">
            Software Engineer <br />
            DevOps Enthusiast <br />
            OSS Advocate
          </h1>
          <p className="xl:w-4/5">
            I build software and infrastructure with the precision of an engineer and the curiosity of an artist, creatively and
            efficiently solving problems using bold ideas and experimental 
            methods. I'm passionate about OSS and automating workflows.
          </p>
          <p className="pt-4 text-bensongrey xl:w-3/5">
            Deeply invested in improving DevX, Cx, and xD because how things feel is just as important as how they work.
          </p>
        </div>
        <div className="image-section mx-10 w-2/5">
          <img src="images/front-image.png" alt="Benson Imoh portrait" />
        </div>
      </div>
      <div className="mobile-header flex flex-col items-center pt-20 w-full md:hidden">
        {/* <Logo className="w-24" /> */}
        <img src="images/front-image.png" className="my-12" alt="Benson Imoh portrait" />
        <div className={`${boxBgClass} text-white py-3 px-8 border-bensonpink border-l-8 font-dosis text-lg text-center w-3/4 mb-2`}>
          SOFTWARE ENGINEER
        </div>
        <div className={`${boxBgClass} text-white py-3 px-8 border-bensonpink border-l-8 font-dosis text-lg text-center w-3/4 mb-2`}>
          DEVOPS ENTHUSIAST
        </div>
        <div className={`${boxBgClass} text-white py-3 px-8 border-bensonpink border-l-8 font-dosis text-lg text-center w-3/4`}>
          OSS ADVOCATE
        </div>
      </div>
      <SocialIcons className="absolute bottom-10 social-icons hidden md:flex flex-col w-8 ml-4 text-center text-bensongrey" />
      <div className="hidden md:flex copyright-container absolute right-24 bottom-8 font-roboto text-sm text-bensongrey">
        <Copyright />
      </div>
    </div>
  );
}
