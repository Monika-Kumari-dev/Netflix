import  {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:null,
  reducers: {
  addUser: (state, action) => {
    return action.payload;   // ✅ actually store the user data
  },
  removeUser: (state, action) => {
    return null;   // ✅ correct as-is
  },
},
});
export const{addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;