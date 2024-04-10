import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { Select } from "antd";

const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Name: "",
    PhoneNumber: "",
    Country: "",
    City: "",
    Latitude: null,
    Longitude: null,
    Address: "",
    Email: "",
    Password: "",
    OTP: "",
  });

  const [cities, setCities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCountryChange = (value) => {
    setData({
      ...data,
      Country: value,
      City: "",
    });

    if (value === "Nigeria") {
      setCities([
        "Yenagoa, Bayelsa state",
        "Port-Harcourt, Rivers state",
        "Ikeja, Lagos state",
      ]);
    } else if (value === "Ghana") {
      setCities(["Accra"]);
    } else {
      setCities([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const updatedData = {
            ...data,
            Latitude: latitude,
            Longitude: longitude,
          };

          // Make the registration request with updatedData
          axios
            .post(`${apiBaseUrl}/user/register`, updatedData)
            .then(() => {
              console.log("Registration successful");
              Swal.fire("Success", "Registration successful", "success");
              navigate("/login"); // Display success message
            })
            .catch((error) => {
              // Handle registration error
              console.error("Registration failed:", error.response.data.error);
              error.response.data.error;
            });
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          // Handle geolocation error, display an error message, etc.
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      // Handle the case where geolocation is not supported.
    }
  };

  return (
    <>
      <div className="bg-white w-full h-screen  overflow-y-auto">
        <div className="container mx-auto my-auto py-10 md:px-8 px-10  ">
          <img
            src="/marketshare.svg"
            alt=""
            width={100}
            height={100}
            className="w-10"
          />
          <h1 className="text-xl font-bold  mb-8 text-wrap text-black ">
            Create an account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="mb-4 max-w-md">
              {" "}
              <input
                type="text"
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                name="Name"
                placeholder="Name"
                value={data.Name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 max-w-md">
              <input
                type="text"
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                name="Email"
                placeholder="Email"
                value={data.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 max-w-md">
              <input
                type="tel"
                pattern="[\d\s\+\-\(\)]+"
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                name="PhoneNumber"
                placeholder="Phone Number"
                value={data.PhoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 max-w-md">
              <input
                type="password"
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                name="Password"
                placeholder="Password"
                value={data.Password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 max-w-md">
              <input
                type="password"
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                name="ConfirmPassword"
                placeholder="Confirm Password"
                value={data.ConfirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 max-w-md">
              <label className="block text-xs font-bold text-black">
                Country
              </label>
              <Select
                name="Country"
                className="w-full"
                value={data.Country}
                onChange={handleCountryChange}
                placeholder="Select Country"
                required
              >
                <Option value="Nigeria">Nigeria</Option>
                <Option value="Ghana">Ghana</Option>
                <Option value="Togo">Togo</Option>
              </Select>
            </div>

            <div className="mb-4 max-w-md">
              <label className="block text-xs font-bold text-black">City</label>
              <Select
                name="City"
                className="w-full"
                value={data.City}
                onChange={(value) => setData({ ...data, City: value })}
                placeholder="Select City"
                required
              >
                {cities.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-4 max-w-md">
              <input
                type="text"
                className="w-full text-xs font-bold text-black px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                name="Address"
                placeholder="Address"
                value={data.Address}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full max-w-md h-full p-4 bg-green-600 hover:bg-green-500 rounded-lg flex justify-center items-center gap-4"
            >
              <div className="text-white text-sm font-satoshi font-bold tracking-wide">
                CREATE ACCOUNT
              </div>
            </button>
          </form>

          <div className="flex items-center mt-4 gap-10 w-full max-w-md">
            <div className="w-full h-[1px] border-[1px] bg-black mt-4"></div>
            <h1
              className="text-xs text-black text-center text-normal"
              style={{ whiteSpace: "nowrap" }}
            >
              or <br />
              sign up with
            </h1>{" "}
            <div className="w-full h-[1px] border-[1px] bg-black mt-4"></div>
          </div>
          <div className="flex gap-6 max-w-md w-full items-center justify-between mt-5">
            <div className="border border-black px-3 py-1 inline-flex items-center gap-2">
              <img
                src="/Google.svg"
                alt=""
                width={100}
                height={100}
                className="w-6"
              />
              <h5 className="text-black md:text-sm text-xs font-medium">
                Google
              </h5>
            </div>

            <div className="border border-black px-3 py-1 inline-flex items-center gap-2">
              <img
                src="/Facebook.svg"
                alt=""
                width={100}
                height={100}
                className="w-6"
              />
              <h5 className="text-black md:text-sm text-xs font-medium">
                Facebook
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
