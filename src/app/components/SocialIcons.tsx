import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import siteMetadata from "../../../siteMetadata";
import { JSX, ClassAttributes, HTMLAttributes } from "react";

const SocialIcons = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) => {
  const { twitter, linkedin, facebook, youtube, instagram, github } =
    siteMetadata.social;
  return (
    <div {...props} data-testid="social-icons">
      <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" aria-label="GitHub Profile">
        <FaGithub />
      </a>
      <a
        href={`https://linkedin.com/in/${linkedin}`}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn Profile"
      >
        <FaLinkedinIn />
      </a>
      <a
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter Profile"
      >
        <FaTwitter />
      </a>
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram Profile"
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default SocialIcons;
