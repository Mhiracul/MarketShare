import { AiFillCreditCard } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FaCarSide, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container-xxl">
      <div className="l py-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-md shadow-md flex flex-col items-center justify-center p-5">
            <div className="bg-[#F0F2F8] mb-2 rounded-full p-2">
              <FaCarSide size={25} />
            </div>

            <h5 className="font-semibold mb-2">Worldwide Delivery</h5>
            <p className="text-center text-xs">
              We offer competitive prices on our 100 million plus product <br />{" "}
              any range.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-md flex flex-col items-center justify-center  p-5">
            <div className="bg-[#F0F2F8] mb-2 rounded-full p-2">
              <AiFillCreditCard size={25} />
            </div>

            <h5 className="font-semibold mb-2">Safe Payment</h5>
            <p className="text-center text-xs">
              We offer competitive prices on our 100 million plus product <br />{" "}
              any range.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-md flex flex-col items-center justify-center  p-5">
            <div className="bg-[#F0F2F8] mb-2 rounded-full p-2">
              <FaShieldAlt size={25} />
            </div>

            <h5 className="font-semibold mb-2">Shop With Confidence</h5>
            <p className="text-center text-xs">
              We offer competitive prices on our 100 million plus product <br />{" "}
              any range.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-md flex flex-col items-center justify-center  p-5">
            <div className="bg-[#F0F2F8] mb-2 rounded-full p-2">
              <BiSupport size={25} />
            </div>

            <h5 className="font-semibold mb-2">24/7 SUPPORT</h5>
            <p className="text-center text-xs">
              We offer competitive prices on our 100 million plus product <br />{" "}
              any range.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
