import Copyright from "@/app/components/Copyright";
import Button from "@/app/components/Button";
import SocialIcons from "@/app/components/SocialIcons";
export default function Home() {
  return (
    <div className="font-roboto">
      Hello World
      <Copyright />
      <Button type="button">Submit</Button>
      <SocialIcons className="absolute bottom-10 social-icons hidden md:flex flex-col w-8 ml-4 text-center text-bensongrey" />
    </div>
  );
}
