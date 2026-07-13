import React from "react";
import { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="relative h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/eaa165a3-80a7-44cb-8df6-be1a7e225369/web/IN-en-20260706-TRIFECTA-perspective_2f2fae68-6962-4d52-8cc2-1fe6ef5c6a56_large.jpg"
          alt="Background"
        />
        <form className="absolute inset-0 m-auto w-3/12 h-fit p-12 bg-black/80 text-white">
          <h1 className="font-hold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
           {!isSignInForm &&(<input
            type="text"
            placeholder=" Full Name"
            className="p-2 m-2 w-full bg-white text-black"
          />)}   
          <input
            type="text"
            placeholder="Email Address"
            className="p-2 m-2 w-full bg-white text-black"
          />
          
          <input
            type="password"
            placeholder="Password"
            className="p-2 m-2 w-full bg-white text-black"
          />
          <button className="p-4 m-4 bg-red-700 w-full cursor-pointer">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
