/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import playstore from "../assets/images/pay/play.jpg";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  lg:gap-20 gap-10 container mx-auto px-4 sm:px-6 md:px-8  py-20 w-full">
        <div className="1 max-w-sm mb-8">
          <div className="inline-flex gap-2 items-center">
            <img
              src="/marketshare.svg"
              alt=""
              width={100}
              height={100}
              className="w-10"
            />
            <h1 className="text-white font-mukta font-bold text-xl">
              MarketShare
            </h1>
          </div>
          <div className="mt-5">
            <p className="text-sm text-[#eeeded]">
              29A OLADIMEJI ALOO STREET, <br /> LEKKI PHASE 1, LAGOS, LEKKI,
              LAGOS STATE
            </p>
          </div>
          <div className="mt-5 flex flex-col">
            <p className="text-sm text-[#eeeded] inline-flex items-center gap-1">
              {" "}
              <BiPhoneCall color="#ffffff" /> +234 803 549 1894
            </p>
            <p className="inline-flex items-center gap-1">
              <BiMailSend color="#fff" />
              <a
                className="text-[#eeeded] text-sm"
                href="mailto:info@marketsharestore.com?subject=Your%20Subject&body=Your%20Message"
              >
                info@marketsharestore.com
              </a>
            </p>
          </div>
        </div>

        <div className="3 text-white text-sm mb-8">
          <ul className=" flex flex-col lg:gap-8 gap-3">
            <li className="font-bold text-base">Company</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Food Items</li>
          </ul>
        </div>

        <div className="3 text-white text-sm mb-8">
          <ul className=" flex flex-col lg:gap-8 gap-3">
            <li className="font-bold text-base">Policy</li>
            <Link to="/privacy-policy">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/terms">
              {" "}
              <li>Terms and Conditions</li>{" "}
            </Link>
            <li>Connect with us</li>
          </ul>
        </div>

        <div className="col-md-4 text-white col-lg-4">
          <h2 className="footer-title mb-3">
            <b>Install</b>
          </h2>
          <p className="mb-3">Available On Google Play Services</p>
          <div className="className='mb-3 col-md-6 col-12 pay">
            <div className="mb-3">
              <Link
                to="https://play.google.com/store/apps/details?id=com.marketshare.com"
                passHref
              >
                <img src="/playstore.svg" alt="" width={100} height={100} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#4f1832] w-full font-sans">
        <div className="container mx-auto py-8 gap-3 flex md:flex-col flex-col justify-between items-center">
          <p className="  text-[#fff] mt-3">
            &copy; Copyright {new Date().getFullYear()}{" "}
            info@marketsharestore.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
