"use client";

import { useTheme } from "@/app/context/ThemeContext";
import React from "react";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  "data-testid"?: string;
};

const Logo = ({
  width = 120,
  height = 120,
  className = "",
  alt = "Benson's Logo",
  "data-testid": dataTestId = "logo",
}: LogoProps) => {
  const { actualTheme } = useTheme();
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid={dataTestId}
      aria-label={alt}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M31.4669 76.4796V83.6796H38.6267H45.7868V76.4796V69.2796H38.6267H31.4669V76.4796Z" 
        fill={actualTheme === "dark" ? "#FF4D94" : "#EC2C7C"}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M31.3068 39.72V67.3602H38.5869H45.867V59.9127V52.4655L54.4869 52.5039C63.9048 52.5459 65.4918 52.608 68.2266 53.0412C73.0056 53.7981 75.8658 56.6997 76.284 61.2132C76.7772 66.5394 73.7598 70.4082 68.5278 71.157C66.72 71.4162 65.271 71.457 56.5668 71.496L47.787 71.5356V77.6076V83.6802L51.5268 83.679C69.1764 83.6742 74.5806 83.3376 78.4668 82.0008C90.2484 77.9478 95.3034 61.9974 87.921 52.1667C85.7844 49.3209 82.6686 47.1783 78.7866 45.8847C78.435 45.7674 78.093 45.6534 78.0276 45.6309C77.9574 45.6072 78.27 45.402 78.7878 45.132C87.5598 40.5582 90.5592 29.1771 85.1688 20.9199C82.1004 16.2204 77.7186 13.47 71.9868 12.6456C68.3544 12.1233 66.561 12.081 47.8869 12.0804L31.3068 12.0801V39.72ZM64.6668 24.159C67.5528 24.303 69.0234 24.6774 70.5408 25.6551C74.559 28.2441 74.8098 35.145 70.9962 38.1933C68.3556 40.3038 66.9996 40.4778 53.1669 40.4793L45.867 40.4799V32.2272V23.9745L54.447 24.0258C59.166 24.054 63.765 24.114 64.6668 24.159Z" 
        fill={actualTheme === "dark" ? "#FFFFFF" : "#040404"}
      />
    </svg>
  );
};

export default Logo;
