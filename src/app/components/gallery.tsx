"use client";
import React, { memo, useEffect, useState } from "react";
import { deleteItem, ItemTypes } from "../db";
import ImageLoader from "./itemLoader";
import Info from "./infoItem";
import { set } from "lodash";

const Gallery = ({
  item,
  num,
  handleSelect,
  setloading,
  setitems,
  handleGetItems,
}: {
  item: ItemTypes;
  num: number;
  handleSelect: any;
  setloading: any;
  setitems: any;
  handleGetItems: any;
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
    handleGetItems();
  };

  const handleInfo = () => {
    setinfo((prev: any) => !prev);
  };

  const [selected, setselected] = useState<boolean>(false);

  const handleSelectItem = () => {
    let ids = JSON.parse(sessionStorage.getItem("select") || "[]");

    if (ids.includes(item.id)) {
      ids = ids.filter((x: number) => x !== item.id);
      // setidList(ids);
    } else {
      ids.push(item.id);
      // setidList(ids);
    }

    sessionStorage.setItem("select", JSON.stringify(ids));
    setselected(!selected);
    window.dispatchEvent(new Event("ids-updated"));
  };

  const [visible, setvisible] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setvisible(true);
    }, 500 + num * 150);
  }, []);

  return (
    <div>
      <div
        className="relative flex justify-center items-center cursor-pointer rounded-xl shadow-md"
        style={{
          boxShadow: `0px 0px 50px ${item.shadow}10`,
        }}
        key={num}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect(item.id, "/");
        }}
        // data-sal="zoom-in"
        // data-sal-delay={300 + num * 100}
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
            {/* <i className="fi fi-rr-trash text-sm mt-1"></i> */}
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
        {/* <img
          src={url}
          alt={item.name}
          className=" w-full object-cover pointer-events-none rounded-xl "
        /> */}
        <ImageLoader
          src={url}
          alt={item.name}
          delay={500 + num * 100}
          palette={item.palette}
        />
      </div>

      {info && <Info item={item} num={num} url={url} handleInfo={handleInfo} />}
    </div>
  );
};

export default memo(Gallery);
