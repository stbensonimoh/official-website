import Image, { ImageProps } from "next/image";
type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt?: string;
};

const Logo = ({
  src = "/logo.svg",
  alt = "Benson's Logo",
  ...props
}: LogoProps) => {
  return <Image src={src} data-testid="logo" alt={alt} {...props} />;
};

export default Logo;
