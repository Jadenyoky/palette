"use client";
import React from "react";
import { deleteItem, ItemTypes } from "../db";

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
      className="gallery-item cursor-pointer overflow-hidden rounded-xl shadow-md"
      style={{ boxShadow: `0px 0px 50px ${item.shadow}10` }}
      key={num}
      onClick={() => {
        handleSelect(item.id, "/");
      }}
      data-aos="fade-up"
      data-aos-delay={200 + num * 100}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(e);
        }}
        className="
      absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer
      "
      >
        delete
      </button>
      <img
        src={url}
        alt={item.name}
        className=" w-full object-cover pointer-events-none"
      />
    </div>
  );
};

export default Gallery;
