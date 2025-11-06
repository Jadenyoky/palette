"use client";
import React, { memo, useEffect, useState } from "react";
import Info from "./infoColor";

const Fav = ({ color, num, setitems, handleGetItems }: any) => {
  const [info, setinfo] = useState<boolean>(false);

  const handleInfo = () => {
    setinfo(!info);
  };

  const [selected, setselected] = useState<boolean>(false);

  const handleSelectItem = () => {
    let ids = JSON.parse(sessionStorage.getItem("select") || "[]");

    if (ids.includes(color.id)) {
      ids = ids.filter((x: number) => x !== color.id);
    } else {
      ids.push(color.id);
    }

    sessionStorage.setItem("select", JSON.stringify(ids));
    setselected(!selected);
    dispatchEvent(new Event("ids-updated"));
  };

  const [visible, setvisible] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setvisible(true);
    }, 500 + num * 150);
  }, []);

  return (
    <div className="itemFav">
      <div
        className={`relative h-20 rounded-md 
            
          `}
        style={{
          backgroundColor: color.hex,
        }}
        data-aos="fade-in"
        data-aos-delay={500 + num * 100}
      >
        <div
          className={`absolute top-0 right-0 flex flex-col justify-between h-full gap-1 z-20 `}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectItem();
            }}
            className={`
      w-7 h-7 ${
        selected ? "bg-red-500/50" : "bg-red-500/10"
      } p-2 rounded-[24px_20px_24px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-red-500/50  backdrop-brightness-50 border border-white/20 transition-transform duration-300 ${
              visible ? "scale-100" : "scale-0"
            } 
            `}
          >
            {selected ? (
              <i className="fi fi-sr-check text-xs mt-1"></i>
            ) : (
              <i className="fi fi-rr-check text-xs mt-1"></i>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInfo();
            }}
            className={`
      w-7 h-7 bg-cyan-500/10 p-2 rounded-[24px_24px_20px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-cyan-500/50  backdrop-brightness-50 border border-white/20 transition-transform duration-300 ${
        visible ? "scale-100" : "scale-0"
      } 
        `}
          >
            <i className="fi fi-rr-information text-xs mt-1"></i>
          </button>
        </div>
      </div>
      {info && <Info handleInfo={handleInfo} color={color} num={num} />}
    </div>
  );
};

export default memo(Fav);
