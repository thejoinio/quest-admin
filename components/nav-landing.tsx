"use client";
import Link from "next/link";
import joinLogo from "@/assets/images/logo.png";
import Image from "next/image";


export const Navbar = () => {

  return (
    <header className="w-full font-[family-name:var(--font-tsb)] border-b border-[#374151] bg-[#09141B]/10 backdrop-blur">
      <nav className="flex justify-between items-center w-full max-w-[1440px] mx-auto h-20 px-4 md:px-10 lg:px-20">
        <Link href={"/"} className="flex items-center z-50 h-[30px]">
          <Image
            src={joinLogo}
            alt="Join Logo"
            width={192}
            height={67}
            className="flex h-[30px] w-auto"
          />
        </Link>
      </nav>
    </header>
  );
};
