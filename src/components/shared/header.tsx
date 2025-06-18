import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex bg-white items-center justify-center border-b">
      <div className="w-full  max-w-5xl px-4 py-2 md:py-3 flex items-center justify-between">
        <Image
          src={"/Logo.svg"}
          alt="Logo"
          width={200}
          height={100}
          className="w-full max-w-[121px] md:max-w-[151px]"
        />
        {/* <Image
          src={"/logo-bc11a56964abb98f6e50709bd43334b2.png"}
          alt="logo-bc11a56964abb98f6e50709bd43334b2"
          width={300}
          className="w-full max-w-[139px] md:max-w-[254px]"
          height={100}
        /> */}
        <Image
          src={"/ssl-img.svg"}
          alt="mmb-logo-reverse.svg"
          width={200}
          height={100}
          className="w-full max-w-[68px] md:max-w-[115px]"
        />
        {/* <Image
          src={"/mmb-logo-reverse.svg"}
          alt="mmb-logo-reverse.svg"
          width={200}
          height={100}
          className="w-full max-w-[68px] md:max-w-[95px]"
        /> */}
      </div>
    </header>
  );
};

export default Header;
