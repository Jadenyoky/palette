"use client";
import React from "react";
import moment from "moment";

interface infoTypes {
  color: any;
  num: number;
  handleInfo: any;
  url?: any;
}

const Info = ({ color, num, handleInfo }: infoTypes) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="fixed top-0 left-0 h-full w-full z-30 backdrop-brightness-20 flex justify-center items-center max-md:items-end"
      data-aos="fade-in"
    >
      <div
        className="absolute top-0 w-full h-full"
        onClick={() => {
          handleInfo();
        }}
      ></div>
      <div
        className=" absolute rounded-2xl max-md:rounded-[24px_24px_0px_0px] flex flex-col gap-8 p-8 bg-white max-md:w-full text-orange-500 font-[maven_pro]"
        style={{
          boxShadow: ` 0px 0px 50px ${color.hex}90`,
        }}
        data-aos="slide-up"
      >
        <div className="flex items-start flex-wrap gap-8">
          <div
            className={` w-14 h-14 rounded-full`}
            style={{
              backgroundColor: `${color.hex}`,
            }}
          ></div>
          <div className="flex flex-col gap-4 font-bold text-cyan-500 flex-1">
            <button
              type="button"
              className="cursor-pointer flex justify-between gap-4 flex-1"
              data-aos="fade-in"
              data-aos-delay="400"
              onClick={() => {
                handleCopy(color.hex);
              }}
            >
              <p>{color.hex}</p>
              <div>
                <i className="fi fi-rr-copy mt-1 text-orange-500/50 hover:text-orange-500 transition "></i>
              </div>
            </button>
            <button
              type="button"
              className="cursor-pointer flex justify-between gap-4 flex-1"
              data-aos="fade-in"
              data-aos-delay="400"
              onClick={() => {
                handleCopy(color.rgb);
              }}
            >
              <p>{color.rgb}</p>
              <div>
                <i className="fi fi-rr-copy mt-1 text-orange-500/50 hover:text-orange-500 transition "></i>
              </div>
            </button>

            <div
              className="text-sm text-cyan-500/50 font-normal"
              data-aos="fade-in"
              data-aos-delay="500"
            >
              <p>{moment(color.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
