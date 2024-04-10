"use client";
import { useState } from "react";
import Logo from "../assets/images/products/marketsare.png";
import { FiSearch } from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";

function HeaderTop() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-white px-[6%] py-2 flex flex-row justify-between align-middle items-center shadow-lg">
      <div className="flex flex-row align-middle gap-2 items-center">
        <img src={Logo} alt="logo" className="w-[40px]" />
      </div>
      <div className="block md:hidden">
        <button onClick={handleMenuToggle}>
          <BiMenuAltRight size={30} />
        </button>
        {mobileMenuOpen && (
          <div className="absolute top-12 right-6 mt-2 py-2 w-[300px] bg-white border rounded z-10">
            <div
              className={`${
                mobileMenuOpen ? "flex" : "hidden"
              } md:hidden flex-col h-[350px] p-5 w-[300px] z-10 mt-0`}
            >
              <div className="h-[50px] justify-between items-center gap-2 w-full p-3 border rounded-md md:flex">
                <div className="flex flex-row gap-5 items-center ">
                  <div className="w-4 h-4 justify-center items-center flex">
                    <div className="w-4 h-4 relative">
                      <FiSearch />
                    </div>
                  </div>
                  <input
                    placeholder="Search"
                    className="placeholder:text-neutral-400 text-gray-900 text-base font-normal leading-normal tracking-tight w-[50%] focus:border-0 focus:outline-none focus:ring-0 font-Montserrat"
                  />
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-6">
                <Link
                  href="/"
                  className="text-black font-Montserrat text-[12px]"
                >
                  Home
                </Link>
                <Link
                  href="/"
                  className="text-black font-Montserrat text-[12px]"
                >
                  About Us
                </Link>

                <Link
                  href="/"
                  className="text-black font-Montserrat text-[12px]"
                >
                  Categories
                </Link>
                <Link
                  href="/"
                  className="text-black font-Montserrat text-[12px]"
                >
                  Sign In
                </Link>
                <button className="bg-[#C82C2F] px-5 py-3 rounded-md text-white text-[12px] font-Montserrat text-md w-[150px]">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-row gap-10 md:flex hidden">
        <Link href="/" className="text-black font-Montserrat text-[12px]">
          Home
        </Link>
        <Link href="/" className="text-black font-Montserrat text-[12px]">
          About Us
        </Link>
      </div>
      <div className="h-6 justify-between items-center gap-2 w-[500px] p-5 border rounded-md md:flex hidden">
        <div className="flex flex-row gap-5 items-center ">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative">
              <FiSearch />
            </div>
          </div>
          <input
            placeholder="Search"
            className="placeholder:text-neutral-400 text-gray-900 text-base font-normal leading-normal tracking-tight w-[50%] focus:border-0 focus:outline-none focus:ring-0 font-Montserrat"
          />
        </div>
        <select className="pl-5 border-l-2 border-[#00000066]">
          <option>Explore</option>
          <option>Browse</option>
        </select>
      </div>
      <div className="md:flex hidden flex-row gap-10 items-center">
        <Link href="/" className="text-black font-Montserrat text-[12px]">
          Categories
        </Link>
        <Link href="/" className="text-black font-Montserrat text-[12px]">
          Sign In
        </Link>
        <button className="bg-[#C82C2F] px-5 py-2 rounded-md text-white text-[12px] font-Montserrat text-md">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default HeaderTop;
