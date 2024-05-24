import { JSX, ClassAttributes, ImgHTMLAttributes } from "react";

const Logo = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <>
            <img
                src="/logo.svg"
                data-testid="logo"
                alt="Benson's Logo"
                {...props}
            />
        </>
    );
};

export default Logo;
