"use client";
import React, { useEffect } from "react";
import { deleteItem, ItemTypes } from "../db";
import Aos from "aos";

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

  const handleDelete = async (e: any) => {
    const current = sessionStorage.getItem("currentItem");

    if (current === item.id) {
      sessionStorage.removeItem("currentItem");
    }

    await deleteItem("items_store", item.id);

    setitems((prev: any) => prev.filter((i: any) => i.id !== item.id));
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-xl shadow-md"
      style={{ boxShadow: `0px 0px 50px ${item.shadow}10` }}
      key={num}
      onClick={() => {
        handleSelect(item.id, "/");
        window.scrollTo(0, 0);
      }}
      data-aos="zoom-in"
      data-aos-delay={300 + num * 100}
    >
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(e);
          }}
          className="
      w-7 h-7 bg-black/30 p-2 rounded-full cursor-pointer flex justify-center items-center text-white/90 hover:bg-black/90 transition shadow-xl shadow-white/50
      "
        >
          <i className="fi fi-rr-trash text-sm mt-1"></i>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(e);
          }}
          className="
      w-7 h-7 bg-black/40 p-2 rounded-full cursor-pointer flex justify-center items-center text-white/90 hover:bg-black/90 transition shadow-xl shadow-white/50
      "
        >
          <i className="fi fi-rr-info text-sm mt-1"></i>
        </button>
      </div>
      <img
        src={url}
        alt={item.name}
        className=" w-full object-cover pointer-events-none"
      />
    </div>
  );
};

export default Gallery;
