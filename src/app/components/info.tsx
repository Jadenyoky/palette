"use client";
import moment from "moment";
import React from "react";
import ItemLoader from "./itemLoader";

interface infoTypes {
  item: any;
  num: number;
  handleInfo: any;
  url: any;
}

const Info = ({ item, num, url, handleInfo }: infoTypes) => {
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
          boxShadow: ` 0px 0px 50px ${item.shadow}90`,
        }}
        data-aos="slide-up"
      >
        <div className="flex items-start flex-wrap gap-8">
          <div
            className="max-w-28 max-h-28 rounded-xl overflow-hidden flex justify-center items-start"
            data-aos="zoom-out"
            data-aos-delay="300"
          >
            {/* <img
                  src={url}
                  alt={item.name}
                  className="object-cover w-full h-full"
                /> */}
            <ItemLoader
              src={url}
              alt={item.name}
              delay={500 + num * 100}
              palette={item.palette}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="" data-aos="fade-in" data-aos-delay="400">
              {item.name}
            </p>
            <p
              className="text-sm text-orange-500/50"
              data-aos="fade-in"
              data-aos-delay="500"
            >
              {moment(item.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-end bg-white">
          <div
            className="flex justify-center items-center text-black/40"
            data-aos="zoom-in"
            data-aos-delay="550"
          >
            <i className="fi fi-rr-palette text-2xl mt-1.5"></i>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {item.palette.map((color: any, index: number) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: `rgb(${color})` }}
                data-aos="fade-in"
                data-aos-delay={500 + index * 100}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
