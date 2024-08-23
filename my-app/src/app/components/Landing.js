"use client";
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
function Landing() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-[2vw] mt-[10vw] pl-[10vw] w-full">
        <div className="flex flex-row gap-[150px]">
          <p className="text-[1.5vw] font-normal w-[50vw]">
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
          <img src="https://img.freepik.com/free-vector/cloud-computing-concept_53876-66074.jpg?t=st=1722850205~exp=1722853805~hmac=2093dd2614b325449e31027dabdbb6c799811d53ab0590a1e0314e60d0a768ff&w=1380" className="w-[450px] h-[300px] mr-[100px]"/>
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
