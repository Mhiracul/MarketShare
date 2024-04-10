import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Email: "",
  Name: "",
  PhoneNumber: "",
  Country: "",
  City: "",
  Address: "",
  Latitude: "",
  Longitude: "",
  _id: "",
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const userData = action.payload; // Assuming the payload contains user data
      if (userData) {
        state._id = userData._id;
        state.Name = userData.Name;
        state.Email = userData.Email;
        state.Address = userData.Address;
        state.City = userData.City;
        state.Country = userData.Country;
        state.Longitude = userData.Longitude;
        state.Latitude = userData.Latitude;
        state.PhoneNumber = userData.PhoneNumber;
      }
    },

    logoutRedux: (state, action) => {
      state._id = "";
      state.Name = "";
      state.role = "";
      state.Email = "";
      state.Address = "";
      state.City = "";
      state.Country = "";
      state.PhoneNumber = "";
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { loginRedux, logoutRedux, setUsers } = userSlice.actions;
export default userSlice.reducer;
