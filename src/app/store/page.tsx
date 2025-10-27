"use client";
import React, { useEffect, useState } from "react";
import { clearAllItems, getAllItems, ItemTypes } from "../db";
import ColorThief from "colorthief";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Gallery from "../components/gallery";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const handleGetItems = async () => {
    const items: ItemTypes[] = await getAllItems("items_store");
    console.log(items);

    const order = _.orderBy(items, ["createdAt"], ["desc"]);

    setitems(order);
    setloading(true);
  };

  useEffect(() => {
    handleGetItems();
    return () => {};
  }, []);

  const handleRemoveAll = () => {
    clearAllItems("items_store");
    const current = sessionStorage.getItem("currentItem");

    if (current) {
      sessionStorage.removeItem("currentItem");
    }

    setloading(false);
    handleGetItems();
  };

  const router = useRouter();
  const handleSelect = (id: any, location: string) => {
    sessionStorage.setItem("currentItem", id);
    router.push(location);
  };

  if (!loading)
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  if (items.length === 0 && loading)
    return (
      <div className="flex-1 flex flex-col gap-2 justify-center items-center text-black/40">
        <i
          className="fi fi-rr-images text-2xl "
          data-aos="fade-down"
          data-aos-delay="300"
        ></i>
        <p
          className="capitalize font-[inconsolata] "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          no items yet ..
        </p>
      </div>
    );
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full p-4 sticky top-0 z-10 bg-white backdrop-blur-2xl flex justify-between items-center shadow-md shadow-amber-500/10 rounded-2xl ">
        <div
          className="flex items-center gap-2 text-cyan-500 font-[asap] capitalize"
          data-aos="zoom-in"
        >
          <p>total</p>
          <div
            className="bg-amber-500/10 text-green-500 font-[maven_pro] flex justify-center items-center w-10 h-10 rounded-full "
            data-aos="fade-in"
            data-aos-delay="100"
          >
            {items.length}
          </div>
        </div>
        <button
          type="button"
          className="flex justify-center items-center pr-4 capitalize cursor-pointer rounded-full text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition"
          data-aos="zoom-in"
          onClick={() => {
            handleRemoveAll();
          }}
        >
          <div className="h-10 w-10 rounded-full flex justify-center items-center">
            <i className="fi fi-rr-trash mt-1 text-lg"></i>
          </div>
          <p>remove all</p>
        </button>
      </div>
      <div className="columns-4 max-md:columns-4 max-sm:columns-3 space-y-4 p-4">
        {items.map((item: ItemTypes, i: number) => {
          return (
            <Gallery
              key={i}
              num={i}
              handleSelect={handleSelect}
              item={item}
              setitems={setitems}
              setloading={setloading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
