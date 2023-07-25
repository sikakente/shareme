import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log("Login successful");

    const { credential } = response;
    const userObject = jwt_decode(credential);
    console.log(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client
      .createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              onSuccess={responseGoogle}
              onError={handleLoginError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
