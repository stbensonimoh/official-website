import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import Link, { LinkProps } from "next/link";

type ButtonType = "internal" | "external" | "button";

interface BaseProps {
  type?: ButtonType;
  className?: string;
  children: React.ReactNode;
}

type InternalLinkProps = BaseProps & LinkProps<string>;
type ExternalLinkProps = BaseProps &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type ButtonElementProps = BaseProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonProps = InternalLinkProps | ExternalLinkProps | ButtonElementProps;

const Button: React.FC<ButtonProps> = (props) => {
  const { type = "button", children, className, ...rest } = props;

  if (type === "internal") {
    return (
      <Link {...(rest as LinkProps<string>)} className={`button flex items-center border border-bensonpink w-max py-3 px-10 font-dosis uppercase text-xl font-bold text-bensonpink hover:text-white`}>
          {children}
      </Link>
    );
  }

  if (type === "external") {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={`button flex items-center border border-bensonpink w-max py-3 px-10 font-dosis uppercase text-xl font-bold text-bensonpink hover:text-white`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={`button flex items-center border border-bensonpink w-max py-3 px-10 font-dosis uppercase text-xl font-bold text-bensonpink hover:text-white`}
    >
      {children}
    </button>
  );
};

export default Button;
