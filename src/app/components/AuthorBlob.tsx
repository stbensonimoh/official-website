import Image from "next/image";

type AuthorBlobProps = {
    image: string;
    date: string;
    author: string;
    timeToRead: string;
}

export default function AuthorBlob(props: AuthorBlobProps) {
    return (
      <div className="flex items-center mb-4">
        <Image 
          src={props.image} 
          alt={`${props.author} profile picture`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4 my-4">
          <p className="text-sm font-roboto text-foreground">{props.author}</p>
          <p className="text-xs font-roboto text-secondary">
            {props.date} &nbsp; | &nbsp; {props.timeToRead}
          </p>
        </div>
      </div>
    );
}
