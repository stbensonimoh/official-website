import Image from "next/image";
import Button from "@/app/components/Button";

export default function NotFound() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center font-roboto pt-60 md:pt-20 mx-10">
          <Image
            src="/images/404.png"
            alt="404 error page illustration"
            width={400}
            height={400}
            className="w-2/5 h-auto mb-4"
          />
          <h1 className="font-roboto font-bold text-bensonpink text-6xl">
            404
          </h1>
          <p className="my-6 text-center">
            Awww... Are you lost? It seems like the page you are looking for
            does not exist.
          </p>
          <Button type="internal" href="/">
            Let's go home
          </Button>
        </div>
      </main>
    </>
  );
}