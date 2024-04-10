import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { Input, Select, Button } from "antd";
import { useSelector } from "react-redux";
import ProfileTop from "../components/ProfileTop";

const { Option } = Select;

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [editableUser, setEditableUser] = useState({
    ...user,
    Password: "", // Exclude Password from the editable user object
  });

  useEffect(() => {
    // Fetch user data from your API
    const accessToken = localStorage.getItem("token"); // Add your authentication logic
    axios
      .get(`${apiBaseUrl}/user/profile?Email=${user.Email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        setEditableUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  const handleInputChange = (name, value) => {
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Send a PUT request to update user data
    const accessToken = localStorage.getItem("token"); // Add your authentication logic

    axios
      .put(
        `${apiBaseUrl}/user/profile`,
        {
          ...editableUser,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        // Update the user object with the new data
        console.log("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <>
      <ProfileTop />
      <div className="container-xxl bg-white p-5 ">
        <div className="flex md:flex-row flex-col">
          <div className="flex flex-col items-center">
            <div className="bg-[#008605] px-20 py-3 flex items-center flex-col">
              <div className=" ">
                <img
                  src="https://secure.gravatar.com/avatar/6279362bbc8bbbe628601cc44f1a137e?s=256&d=mm&r=g"
                  alt=""
                  className="w-32 h-32 rounded-full bg-gray-400 p-2"
                />
              </div>
              <h2 className="mt-2 text-xl text-white">{user.Email}</h2>
            </div>
            <div className="bg-white"></div>
          </div>
          <div className="py-5 px-10 w-full">
            <div className="mb-3 form-group">
              <label className="mb-1">Name</label>
              <Input value={user.Name} readOnly />
            </div>
            <div className="mb-3">
              <label className="mb-1">Email</label>
              <Input value={user.Email} readOnly />
            </div>
            <div className="mb-3">
              <label className="mb-1">Country</label>
              <Select
                className="w-full"
                value={editableUser.Country}
                onChange={(value) => handleInputChange("Country", value)}
              >
                <Option value="Nigeria">Nigeria</Option>
                <Option value="Ghana">Ghana</Option>
                <Option value="Togo">Togo</Option>
              </Select>
            </div>
            <div className="mb-3">
              <label className="mb-1">City</label>
              <Select
                className="w-full"
                value={editableUser.City}
                onChange={(value) => handleInputChange("City", value)}
              >
                {/* Populate cities based on the selected country */}
                {/* Example for Nigeria */}
                {editableUser.Country === "Nigeria" && (
                  <>
                    <Option value="Yenagoa, Bayelsa state">
                      Yenagoa, Bayelsa state
                    </Option>
                    <Option value="Port-Harcourt, Rivers state">
                      Port-Harcourt, Rivers state
                    </Option>
                    <Option value="Ikeja, Lagos state">
                      Ikeja, Lagos state
                    </Option>
                  </>
                )}
                {/* Example for Ghana */}
                {editableUser.Country === "Ghana" && (
                  <Option value="Accra">Accra</Option>
                )}
              </Select>
            </div>
            <div className="mb-3 outline-none">
              <label className="mb-1">Address</label>
              <Input
                value={editableUser.Address}
                className="outline-none"
                onChange={(e) => handleInputChange("Address", e.target.value)}
              />
            </div>
            <div className="mb-3 outline-none">
              <label className="mb-1">Phone Number</label>
              <Input
                value={editableUser.PhoneNumber}
                className="outline-none"
                onChange={(e) =>
                  handleInputChange("PhoneNumber", e.target.value)
                }
              />
            </div>
            <div>
              <Button
                type="primary"
                className="bg-[#008605] text-white w-full"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
