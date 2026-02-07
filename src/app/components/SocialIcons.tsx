'use client'

import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import siteMetadata from "../../../siteMetadata";
import { JSX, ClassAttributes, HTMLAttributes } from "react";
import { trackSocialClick } from "@/lib/clarity";

const SocialIcons = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) => {
  const { x, linkedin, facebook, youtube, instagram, github } =
    siteMetadata.social;
  return (
    <div {...props} data-testid="social-icons">
      <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" aria-label="GitHub Profile" onClick={() => trackSocialClick('github')}>
        <FaGithub />
      </a>
      <a
        href={`https://linkedin.com/in/${linkedin}`}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn Profile"
        onClick={() => trackSocialClick('linkedin')}
      >
        <FaLinkedinIn />
      </a>
      <a
        href={`https://x.com/${x}`}
        target="_blank"
        rel="noreferrer"
        aria-label="X Profile"
        onClick={() => trackSocialClick('x')}
      >
        <FaXTwitter />
      </a>
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram Profile"
        onClick={() => trackSocialClick('instagram')}
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default SocialIcons;
