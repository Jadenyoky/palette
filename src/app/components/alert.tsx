"use client";
import React, { memo } from "react";

const Alert = ({
  handleAlert,
  handleAction,
  text,
  buttonOne,
  buttonTwo,
}: any) => {
  return (
    <div
      className="fixed top-0 left-0 h-full w-full backdrop-brightness-20 flex justify-center items-center max-md:items-end z-30"
      data-aos="fade-in"
    >
      <div
        className="absolute top-0 w-full h-full"
        onClick={() => {
          handleAlert();
        }}
      ></div>
      <div
        className=" absolute rounded-2xl max-md:rounded-[24px_24px_0px_0px] flex flex-col gap-8 p-8 bg-white max-md:w-full text-red-500/50 font-[maven_pro] font-semibold"
        style={{
          boxShadow: `0px 0px 50px black`,
        }}
        data-aos="slide-up"
        data-aos-delay="200"
      >
        <div
          className="flex gap-4 items-center"
          data-aos="fade-in"
          data-aos-delay="400"
        >
          <i className="fi fi-rr-info mt-1.5 text-xl"></i>
          <p>{text}</p>
        </div>
        <div className="flex gap-4 items-center *:flex-1 *:capitalize">
          <button
            type="button"
            onClick={handleAlert}
            className="px-4 py-3 rounded-xl text-white bg-green-700 hover:bg-green-600 transition cursor-pointer"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            {buttonOne}
          </button>
          <button
            type="button"
            onClick={() => {
              handleAction();
            }}
            className="px-4 py-3 rounded-xl text-white bg-red-700 hover:bg-red-600 transition cursor-pointer"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            {buttonTwo}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Alert);
