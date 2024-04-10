import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    // Extract email from the query parameter and set it in the state
    const searchParams = new URLSearchParams(location.search);
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [location.search]);

  const handleResetPassword = async () => {
    if (password === confirmPassword) {
      try {
        const response = await axios.post(`${apiBaseUrl}/user/reset_password`, {
          Email: email,
          Password: password,
        });

        if (response.status === 200) {
          // Password reset successful, you can redirect to a login page or show a success message
          toast.success("Password Reset Sucessful", {
            position: "top-right",
            autoClose: 2000, // Close the notification after 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.log("Success");
          navigate("/login"); // Redirect to login page
        } else {
          setError("Password reset failed. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while processing your request.");
      }
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="py-10 text-black">
        <h2>Reset Password</h2>
        <p>Reset the password for the email: {email}</p>
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default ResetPassword;
