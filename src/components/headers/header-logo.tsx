import React, { FC } from "react";
interface HeaderLogoProps {
  backgroundColor?: string;
}

const HeaderLogo:FC<HeaderLogoProps> = ({backgroundColor='black'}) => {

  const logo = `/nexwind-components/logo/logo-${backgroundColor}.svg`;

  return (
    <div className="flex h-16 shrink-0 items-center">
      <img
        className="h-8 w-auto"
        src={logo}
        alt="Your Company"
      />
    </div>
  );
};
export default HeaderLogo;
