import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex bg-white items-center justify-center border-b">
      <div className="w-full  max-w-5xl px-4 py-5 flex items-center justify-between">
        <Image
          src={"/Logo.svg"}
          alt="Logo"
          width={200}
          height={100}
          className="w-full max-w-[71px] md:max-w-[131px]"
        />
        <Image
          src={"/logo-bc11a56964abb98f6e50709bd43334b2.png"}
          alt="logo-bc11a56964abb98f6e50709bd43334b2"
          width={300}
          className="w-full max-w-[139px] md:max-w-[254px]"
          height={100}
        />
        <Image
          src={"/mmb-logo-reverse.svg"}
          alt="mmb-logo-reverse.svg"
          width={200}
          height={100}
          className="w-full max-w-[48px] md:max-w-[85px]"
        />
      </div>
    </header>
  );
};

export default Header;
