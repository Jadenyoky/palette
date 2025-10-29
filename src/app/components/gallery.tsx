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
          className=" w-full object-cover pointer-events-none rounded-xl"
        />
      </div>

      {info && (
        <div
          className="fixed top-0 left-0 h-full w-full border z-20 backdrop-brightness-20"
          onClick={handleInfo}
          data-aos="fade-in"
        >
          <img src={url} alt={item.name} className=" w-20 rounded-sm" />
          {item.name}
          <p className="text-sm">{item.createdAt}</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
