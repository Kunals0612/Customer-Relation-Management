"use client";
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
function Landing() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-[2vw] mt-[10vw] pl-[10vw] w-full">
        <div className="flex flex-row gap-[150px]">
          <p className="text-[1.5vw] font-normal w-[60vw]">
            Welcome to <span className="text-blue-700">Linkify</span>, the
            ultimate solution for managing and enhancing your customer
            relationships. Our powerful, easy-to-use platform helps you
            streamline your sales, marketing, and customer support processes,
            ensuring every interaction is meaningful and productive. With{" "}
            <span className="text-blue-700">Linkify</span>, you can boost
            customer satisfaction, increase retention rates, and drive your
            business growth. Discover the future of customer relationship
            management today!
          </p>
    
        </div>
        <div className="flex flex-row gap-5">
          <Login />
          <SignUp />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Landing;
