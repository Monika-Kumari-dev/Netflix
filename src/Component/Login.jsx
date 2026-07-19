import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonOnClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      name.current?.value,
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const { uid, email, displayName, photoURL } = userCredential.user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute inset-0 m-auto w-3/12 h-fit p-12 bg-black/80 text-white"
        >
          <h1 className="font-hold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder=" Full Name"
              className="p-2 m-2 w-full bg-white text-black"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-2 m-2 w-full bg-white text-black"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2 m-2 w-full bg-white text-black"
          />

          <p className="text-red-500">{errorMessage}</p>

          <button
            className="p-4 m-4 bg-red-700 w-full cursor-pointer"
            onClick={handleButtonOnClick}
          >
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
