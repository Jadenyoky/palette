"use client";
import React, { useEffect, useState } from "react";
import { clearAllItems, getAllItems, ItemTypes } from "../db";
import ColorThief from "colorthief";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Gallery from "../components/gallery";
import Aos from "aos";
import StackGrid from "react-stack-grid";
const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<boolean>(false);
  const handleGetItems = async () => {
    setloading(false);
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

  const handleClearAll = () => {
    clearAllItems("items_store");
    const current = sessionStorage.getItem("currentItem");

    if (current) {
      sessionStorage.removeItem("currentItem");
    }

    setloading(false);
    handleGetItems();
  };

  const handleAlert = () => {
    setalert((prev: any) => !prev);
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
      <div className="w-full px-4 pl-6 py-2 sticky top-0 z-10 bg-white backdrop-blur-2xl flex justify-between items-center shadow-md shadow-amber-500/10 rounded-2xl ">
        <div
          className="flex items-center gap-2 text-cyan-500 font-[asap] capitalize"
          data-aos="zoom-in"
        >
          {/* <p>total</p> */}
          <div
            className=" text-green-500 font-[maven_pro] flex justify-center items-center w-10 h-10 rounded-full border-2 border-green-500/20"
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
            handleAlert();
          }}
        >
          <div className="h-10 w-10 rounded-full flex justify-center items-center">
            <i className="fi fi-rr-trash mt-1 text-lg"></i>
          </div>
          <p>clear all</p>
        </button>
      </div>
      <div className="columns-4 max-md:columns-4 max-sm:columns-3 space-y-4 p-4 ">
        {items.map((item: ItemTypes, i: number) => {
          return (
            <Gallery
              key={i}
              num={i}
              handleSelect={handleSelect}
              item={item}
              setitems={setitems}
              setloading={setloading}
              handleGetItems={handleGetItems}
            />
          );
        })}
      </div>

      {alert && (
        <div
          className="fixed top-0 left-0 h-full w-full z-20 backdrop-brightness-20 flex justify-center items-center max-md:items-end"
          data-aos="fade-in"
        >
          <div
            className="absolute top-0 w-full h-full"
            onClick={() => {
              handleAlert();
            }}
          ></div>
          <div
            className=" absolute rounded-2xl max-md:rounded-[24px_24px_0px_0px] flex flex-col gap-8 p-8 bg-white max-md:w-full text-red-500/50 font-[maven_pro]"
            style={{
              boxShadow: `0px 0px 50px black`,
            }}
            data-aos="slide-up"
          >
            <div
              className="flex gap-4 items-center font-bold"
              data-aos="fade-in"
              data-aos-delay="200"
            >
              <i className="fi fi-rr-info mt-1.5 text-xl"></i>
              <p>Are you sure you want to clear all items ?</p>
            </div>
            <div className="flex gap-4 items-center *:flex-1 *:capitalize font-[asap]">
              <button
                type="button"
                onClick={handleAlert}
                className="px-4 py-3 rounded-xl text-white bg-green-700 hover:bg-green-600 transition cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleClearAll();
                }}
                className="px-4 py-3 rounded-xl text-white bg-red-700 hover:bg-red-600 transition cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
