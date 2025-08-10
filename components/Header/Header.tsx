"use client";
import { CuboidIcon as Cube, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { headerData } from "@/public/fakeData/fakeData";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileOpen] = useState(false);
  const refOne = useRef(null);

  const handleClickOutside = (e: MouseEvent) => {
    //@ts-ignore
    if (!refOne?.current?.contains(e.target)) {
      setIsMobileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="fixed top-0 w-full bg-black border-b border-gray-700 z-50 flex items-center justify-between p-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          {/* <div className="relative">
          <Cube className="w-8 h-8 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded blur-sm opacity-50" />
        </div> */}
          <span className="text-xl font-bold text-white">CryptoVault</span>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {headerData.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div
          className="cursor-pointer lg:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <Menu className="w-6 h-6 text-white" />
        </div>

        {/* CTA Button */}
        <Button className="hidden lg:flex bg-blue-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
          Try it Now
        </Button>
      </header>
      {/* ---------------mobile sidebar---------------- */}

      <div
        className={`block lg:hidden min-h-screen w-full fixed top-0 left-0 z-[999] bg-white/20 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      ></div>
      <div
        className={`lg:hidden fixed w-[300px] bg-[#160e23] top-0 left-0 z-[999] min-h-screen border-r border-gray-700 duration-500 p-4 overflow-y-scroll
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"}`}
        ref={refOne}
      >
        <div className="flex justify-between gap-2 items-center text-white pb-4 border-b border-gray-700">
          <h3 className=" text-2xl font-semibold">CryptoVault</h3>
          <X
            className="cursor-pointer"
            onClick={() => setIsMobileOpen((prev) => !prev)}
          />
        </div>

        <nav className="flex flex-col gap-5 mt-10">
          {headerData.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="text-gray-300 hover:text-white hover:font-medium transition-colors duration-300 relative"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;
