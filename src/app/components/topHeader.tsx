"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import sal from "sal.js";

const TopHeader = ({ items, textButton, handleAlert }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    sal({
      root: document.querySelector(".topNav"),
      once: false,
      threshold: 0,
    });
  }, [pathname, router]);
  return (
    <div className="topNav w-full px-4 pl-6 py-2 sticky top-0  bg-white backdrop-blur-2xl flex justify-between items-center shadow-md shadow-amber-500/10 rounded-2xl z-29">
      <div
        className="flex items-center gap-2 text-cyan-500 font-[asap] capitalize"
        data-sal="zoom-in"
      >
        {/* <p>total</p> */}
        <div
          className=" text-green-500 font-[maven_pro] flex justify-center items-center w-10 h-10 rounded-full border-2 border-green-500/20"
          data-sal="fade-in"
          data-sal-delay="100"
        >
          {items.length}
        </div>
      </div>
      <button
        type="button"
        className="flex justify-center items-center pr-4 capitalize cursor-pointer rounded-full text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition"
        data-sal="zoom-in"
        onClick={() => {
          handleAlert();
        }}
      >
        <div className="h-10 w-10 rounded-full flex justify-center items-center">
          <i className="fi fi-rr-trash mt-1 text-lg"></i>
        </div>
        <p>{textButton}</p>
      </button>
    </div>
  );
};

export default TopHeader;
