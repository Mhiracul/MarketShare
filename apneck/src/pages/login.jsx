import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginRedux } from "../redux/userSlice";
import { apiBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
//import ClipLoader from "react-spinners/ClipLoader";
import { BiHide, BiShow } from "react-icons/bi";
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const [buttonClicked, setButtonClicked] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const userData = useSelector((state) => state);
  console.log(userData.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setIsLoading(true);
    //setButtonClicked(true);

    const { Email, Password } = formData;

    if (Email && Password) {
      try {
        const response = await fetch(`${apiBaseUrl}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const dataRes = await response.json();

          if (dataRes.message === "Success") {
            // Handle successful login
            dispatch(loginRedux(dataRes.data)); // Dispatch user data to Redux store
            localStorage.setItem("token", dataRes.accessToken);
            console.log("Token:", dataRes.accessToken);

            Swal.fire("Success", "Login successful", "success").then(() => {
              navigate("/"); // Redirect to user page
            });
          } else if (dataRes.message === "Not Active") {
            toast.error(dataRes.message);
          } else {
            // Handle other error messages
            toast.error(dataRes.message);
          }
        } else {
          toast.error("Failed to log in");
        }
      } catch (error) {
        console.error("Failed to login:", error);
        toast.error("Failed to login");
      }
    } else {
      toast.error("Please enter both email and password");
    }

    //setIsLoading(false);
    //setButtonClicked(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}/user/forgot_password`, {
        Email: formData.Email,
      });

      if (response.status === 200) {
        toast.success("Password reset email sent successfully.");
        navigate(`/forgotpassword?email=${formData.Email}`);
      } else if (response.status === 400) {
        toast.error("User does not exist.");
      } else {
        toast.error("An error occurred while processing your request.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="bg-white w-full h-screen  overflow-y-auto">
      <div className="container mx-auto  my-auto py-10 md:px-8 px-10  ">
        <img
          src="/marketshare.svg"
          alt=""
          width={100}
          height={100}
          className="w-10"
        />

        <div className="py-10">
          <h1 className="text-xl font-bold  mb-8 text-wrap text-black ">
            Create an account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="mb-4 max-w-md">
              <input
                type="text"
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                id="email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-1 max-w-md flex px-3  items-center   border rounded">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full md:text-sm text-xs md:font-bold font-medium text-[#131313] px-3 py-3 border border-black rounded focus:outline-none "
                name="Password"
                id="password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
              <span
                className="flex text-xl cursor-pointer bg-white rounded-r-md"
                onClick={handleShowPassword}
              >
                {" "}
                {showPassword ? (
                  <BiShow color="#000" />
                ) : (
                  <BiHide color="#000" />
                )}
              </span>
            </div>
            <p className="text-xs mb-4 font-bold text-[#B50000]">
              <Link to="/forgotpassword" onClick={handleForgotPassword}>
                {" "}
                Forgot Password?{" "}
              </Link>
            </p>

            <button className="w-full max-w-md h-full p-4 bg-green-600 hover:bg-green-500 rounded-lg flex justify-center items-center gap-4">
              <div className="text-white text-sm font-satoshi font-bold tracking-wide">
                Login
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
              sign in with
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
          <p className="text-sm text-black font-normal inline-flex items-center gap-2 mt-4">
            Dont have an account?
            <span className="text-sm text-[#B50000] font-bold">
              <Link to="/Signup">Create Now</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
