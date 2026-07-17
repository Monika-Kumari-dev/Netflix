import React, { useState } from "react";
import userIcon from "../assets/userIcon.jpg";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
     console.log("Sign out clicked");
    signOut(auth)
      .then(() => {
            console.log("Sign out successful");
        navigate("/");
      })
      .catch((error) => {
         console.error("Sign out error:", error);
        navigate("/error");
      });
  };
console.log("Header rendering, user:", user);
  return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex items-center justify-between">
      <img
        className="w-48"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAeuLioOK1ZSC8bQbffYbz1gZFxugAQdkx7UsMvqKDtFJLk3EWkpY-w8IBimYy_0xmg1aTzugh7JDHsGzv6hqIL9_qklFo-PFSH81MwCe9rokU4kGkdki.svg"
        alt="logo"
      />
    {user &&<div>
      <img
        className="w-20 h-20 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
        src={user?.photoURL}
        alt="usericon"
        onClick={handleSignOut}
      />
    </div>
}
    </div>
    );
};

export default Header;