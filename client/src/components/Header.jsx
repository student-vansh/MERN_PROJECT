import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

const handleClick = () => {
  navigate("/home"); // your login route
};
  return (

    <div className="mx-4 sm:mx-10 lg:mx-20 relative overflow-hidden">
      

      {/* Main Container */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-10 sm:mt-16">

        <div className="text-center lg:text-left max-w-2xl px-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 border border-primary/40 bg-primary/10 rounded-full text-xs sm:text-sm text-primary">
            <p>New: AI feature integrated</p>
            <img src={assets.star_icon} alt="" className="w-3" />
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-4xl lg:text-6xl font-semibold leading-tight text-primary">
            Smart Study with <br />
            <span className="text-black">VanshNotes.</span>
          </h3>

          {/* Description */}
          <p className="text-gray-500 my-4 sm:my-6 text-xs sm:text-sm lg:text-base">
            Connect with students across the semester and branch. <br />
            Share notes, ace exams and build a learning community. <br />
            All subjects, all semesters — one platform.
          </p>

          {/* Button */}
          <button onClick={handleClick} className="flex items-center justify-center lg:justify-start gap-2 bg-primary text-white px-6 sm:px-8 py-2 rounded hover:scale-105 transition-all cursor-pointer mx-auto lg:mx-0">
            
            Get Started Free
            <img src={assets.arrow} alt="" className="w-4" />
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <img
            src={assets.headersidebar}
            alt=""
            className="w-full"
          />
        </div>

      </div>
    </div>
  );
};

export default Header;