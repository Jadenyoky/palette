"use client";
import React, { useEffect, useState } from "react";
import Info from "./infoColor";
import Loader from "./loader";
import { deleteItem } from "../db";
import sal from "sal.js";

const Fav = ({ color, num, setitems, handleGetItems }: any) => {
  const [info, setinfo] = useState<boolean>(false);
  const [loaded, setloaded] = useState<boolean>(false);

  const handleInfo = () => {
    setinfo(!info);
    console.log(color, num);
  };

  const handleDelete = async (e: any) => {
    await deleteItem("fav_store", color.id);

    setitems((prev: any) => prev.filter((i: any) => i.id !== color.id));
    handleGetItems();
  };

  useEffect(() => {
    sal({
      root: document.querySelector(".itemFav"),
      once: false,
      threshold: 0,
    });
  }, []);
  return (
    <div className="itemFav">
      <div
        className={`relative h-20 rounded-md transition `}
        style={{
          backgroundColor: color.hex,
        }}
        data-sal="slide-up"
        data-sal-delay={200 + num * 100}
      >
        <div className="absolute top-0 right-0 flex flex-col justify-between h-full gap-1 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(e);
            }}
            className="
      w-7 h-7 bg-red-500/50 p-2 rounded-[24px_20px_24px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-red-500/80 transition backdrop-brightness-50
      "
            // data-sal="fade-in"
            // data-sal-delay={500 + num * 100}
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
            // data-sal="fade-in"
            // data-sal-delay={500 + num * 100}
          >
            <i className="fi fi-rr-info text-sm mt-1"></i>
          </button>
        </div>
      </div>
      {info && <Info handleInfo={handleInfo} color={color} num={num} />}
    </div>
  );
};

export default Fav;
