import { JSX, ClassAttributes, HTMLAttributes } from "react";

const Copyright = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p {...props}>Copyright &copy; {new Date().getFullYear()} Benson Imoh,ST</p>
  );
};

export default Copyright;
