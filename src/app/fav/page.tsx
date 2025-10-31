"use client";
import React, { useEffect, useState } from "react";
import { getAllItems, ColorTypes } from "../db";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);

  const handleGetItems = async () => {
    const items = await getAllItems("fav_store");
    // console.log(items);
    setitems(items);
    setloading(true);
  };

  useEffect(() => {
    handleGetItems();
    return () => {};
  }, []);

  if (!loading)
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  if (items.length === 0 && loading)
    return (
      <div className="flex-1 flex flex-col gap-4 justify-center items-center text-black/40">
        <i
          className="fi fi-rr-palette text-2xl "
          data-aos="fade-down"
          data-aos-delay="300"
        ></i>
        <p
          className="capitalize font-[inconsolata] "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          no colors yet
        </p>
      </div>
    );
  return (
    <div className="columns-4 max-md:columns-4 max-sm:columns-3 space-y-4 p-4">
      {items.map((color: ColorTypes, i: number) => {
        return (
          <div
            data-aos="flip-left"
            key={i}
            className={`h-20 w-20 `}
            style={{
              backgroundColor: `${color.hex}`,
            }}
          >
            {color.hex}
            {color.rgb}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
