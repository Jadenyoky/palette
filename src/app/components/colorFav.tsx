"use client";
import React, { memo, useEffect, useState } from "react";
import Info from "./infoColor";
import sal from "sal.js";

const Fav = ({ color, num, setitems, handleGetItems }: any) => {
  const [info, setinfo] = useState<boolean>(false);
  const [loaded, setloaded] = useState<boolean>(false);

  const handleInfo = () => {
    setinfo(!info);
    console.log(color, num);
  };

  useEffect(() => {
    sal({
      root: document.querySelector(".itemFav"),
      once: false,
      threshold: 0,
    });
  }, []);

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

  return (
    <div className="itemFav">
      <div
        className={`relative h-20 rounded-md transition `}
        style={{
          backgroundColor: color.hex,
        }}
        data-sal="zoom-in"
        data-sal-delay={200 + num * 100}
      >
        <div className="absolute top-0 right-0 flex flex-col justify-between h-full gap-1 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // handleDelete(e);
              handleSelectItem();
            }}
            className={`
      w-7 h-7 ${
        selected ? "bg-red-500/50" : "bg-red-500/10"
      } p-2 rounded-[24px_20px_24px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-red-500/50 transition backdrop-brightness-50
            `}
            // data-sal="fade-in"
            // data-sal-delay={500 + num * 100}
          >
            {selected ? (
              <i className="fi fi-sr-check-circle mt-1"></i>
            ) : (
              <i className="fi fi-rr-check-circle mt-1"></i>
            )}
            {/* <i className="fi fi-rr-trash text-sm mt-1"></i> */}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInfo();
            }}
            className="
      w-7 h-7 bg-cyan-500/10 p-2 rounded-[24px_24px_20px_24px] cursor-pointer flex justify-center items-center text-white/90 hover:bg-cyan-500/50 transition backdrop-brightness-50
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

export default memo(Fav);
