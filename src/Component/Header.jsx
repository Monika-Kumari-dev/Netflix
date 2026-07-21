import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = ({ showGptSearch, onGptSearchClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error);
      navigate("/error");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex items-center justify-between">
      <img className="w-48" src={LOGO} alt="logo" />

      <div className="flex items-center gap-3">
        <button
          onClick={onGptSearchClick}
          className="bg-transparent border border-white/40 text-white text-sm px-4 py-2 rounded hover:bg-white/10 transition"
        >
          {showGptSearch ? "Close" : "GPT Search"}
        </button>

        {user && (
          <img
            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
            src={user?.photoURL}
            alt="usericon"
            onClick={handleSignOut}
          />
        )}
      </div>
    </div>
  );
};

export default Header;