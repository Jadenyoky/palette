"use client";
import React, { useEffect, useState } from "react";
import { deleteItem, ItemTypes } from "../db";
import sal from "sal.js";

const Gallery = ({
  item,
  num,
  handleSelect,
  setloading,
  setitems,
}: {
  item: ItemTypes;
  num: number;
  handleSelect: any;
  setloading: any;
  setitems: any;
}) => {
  const url: any = URL.createObjectURL(item.blob);

  const [info, setinfo] = useState(false);

  const handleDelete = async (e: any) => {
    const current = sessionStorage.getItem("currentItem");

    if (current === item.id) {
      sessionStorage.removeItem("currentItem");
    }

    await deleteItem("items_store", item.id);

    setitems((prev: any) => prev.filter((i: any) => i.id !== item.id));
  };

  const handleInfo = () => {
    setinfo((prev: any) => !prev);
  };

  useEffect(() => {
    sal();
  }, []);

  return (
    <div>
      <div
        className="relative flex justify-center items-center cursor-pointer rounded-xl shadow-md"
        style={{ boxShadow: `0px 0px 50px ${item.shadow}10` }}
        key={num}
        onClick={() => {
          handleSelect(item.id, "/");
        }}
        data-sal="zoom-in"
        data-sal-delay={300 + num * 100}
      >
        <div className="absolute top-0 right-0 flex flex-col justify-between h-full gap-1 ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(e);
            }}
            className="
      w-7 h-7 bg-red-500/50 p-2 rounded-[24px_20px_24px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-red-500/80 transition backdrop-brightness-50
      "
          >
            <i className="fi fi-rr-trash text-sm mt-1"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInfo();
            }}
            className="
      w-7 h-7 bg-cyan-500/50 p-2 rounded-[24px_24px_20px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-cyan-500/80 transition backdrop-brightness-50
      "
          >
            <i className="fi fi-rr-info text-sm mt-1"></i>
          </button>
        </div>
        <img
          src={url}
          alt={item.name}
          className=" w-full object-cover pointer-events-none rounded-xl "
        />
      </div>

      {info && (
        <div
          className="fixed top-0 left-0 h-full w-full z-20 backdrop-brightness-20 flex justify-center items-center max-md:items-end"
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
              boxShadow: `0px 0px 50px ${item.shadow}90`,
            }}
            data-aos="slide-up"
          >
            <div className="flex items-center flex-wrap gap-8 max-md:justify-">
              <div
                className="w-28 h-28 rounded-xl overflow-hidden flex justify-center items-center"
                data-aos="zoom-out"
                data-aos-delay="300"
              >
                <img
                  src={url}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="" data-aos="fade-in" data-aos-delay="400">
                  {item.name}
                </p>
                <p
                  className="text-sm opacity-50"
                  data-aos="fade-in"
                  data-aos-delay="500"
                >
                  {item.createdAt}
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-end">
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
      )}
    </div>
  );
};

export default Gallery;
