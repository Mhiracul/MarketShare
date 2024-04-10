import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Initialize OTP state with an array

  useEffect(() => {
    // Extract email from the query parameter and set it in the state
    const searchParams = new URLSearchParams(location.search);
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [location.search]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}/user/forgot_password`, {
        Email: email,
        OTP: otp.join(""), // Join the OTP array into a string
      });

      if (response.status === 200) {
        toast.success("Password reset email sent successfully.", {
          position: "top-right",
          autoClose: 2000, // Close the notification after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("Success");

        navigate(`/resetpassword/?email=${email}`);
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

  // Function to update OTP state immutably
  const updateOtp = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-600">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        maxLength="1"
                        className="w-12 h-12 text-center outline-none border border-gray-200 text-lg bg-white rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        value={digit}
                        onChange={(e) => updateOtp(index, e.target.value)}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <a
                        onClick={handleVerify}
                        className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </a>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didnt receive the code?</p>{" "}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
