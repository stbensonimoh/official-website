import Copyright from "@/app/components/Copyright";
import SocialIcons from "@/app/components/SocialIcons";
export default function Home() {
  return (
    <div>
      <div className="hidden md:flex items-center justify-center mt-12 md:mx-4 xl:mx-0">
        <div className="flex flex-col mx-10 w-1/2 lg:w-1/3">
          <h3 className="text-4xl font-roboto">Hello!</h3>
          <h4 className="text-2xl font-badscript">I am Benson...</h4>
          <h1 className="font-bebas my-4 lg:text-3xl xl:text-5xl">
            Software Engineer <br />
            Experience Designer (xD) <br />
            OSS Advocate
          </h1>
          <p className="xl:w-4/5">
            I'm passionate about blending technology and arts, to creatively and
            efficiently solve problems, using new and experimental ideas and
            methods. I'm enthusiastic about OSS.
          </p>
          <p className="pt-4 text-bensongrey xl:w-3/5">
            Highly skilled in Experience Design(xD), Customer Experience(Cx),
            automation, and Developer Experience(Dx) Engineering.
          </p>
        </div>
        <div className="image-section mx-10">
          <img src="images/front-image.png" />
        </div>
      </div>
      <div className="mobile-header flex flex-col items-center pt-20 w-full md:hidden">
        {/* <Logo className="w-24" /> */}
        <img src="images/front-image.png" className="my-12" />
        <div className="bg-black text-white py-3 px-8 border-bensonpink border-l-8 font-dosis text-lg text-center w-3/4 mb-2">
          SOFTWARE ENGINEER
        </div>
        <div className="bg-black text-white py-3 px-8 border-bensonpink border-l-8 font-dosis text-lg text-center w-3/4 mb-2">
          EXPERIENCE DESIGNER
        </div>
        <div className="bg-black text-white py-3 px-8 border-bensonpink border-l-8 font-dosis text-lg text-center w-3/4">
          OSS ADVOCATE
        </div>
      </div>
      <SocialIcons className="absolute bottom-10 social-icons hidden md:flex flex-col w-8 ml-4 text-center text-bensongrey" />
      <div className="hidden md:flex copyright-container absolute right-8 bottom-8 font-roboto text-sm text-bensongrey">
        <Copyright />
      </div>
    </div>
  );
}
