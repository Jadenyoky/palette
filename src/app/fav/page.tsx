"use client";
import React, { useEffect, useState } from "react";
import { getAllItems, clearAllItems } from "@/app/db";
import Alert from "@/components/alert";
import _ from "lodash";
import TopHeader from "@/components/topHeader";
import MasonryFav from "@/components/masonryFav";
import { toast } from "sonner";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<boolean>(false);

  const handleGetItems = async () => {
    setloading(false);
    const items = await getAllItems("fav_store");
    const order = _.orderBy(items, ["createdAt"], ["desc"]);
    const uniq = _.uniqBy(order, "hex");
    setitems(uniq);
    setloading(true);
  };

  useEffect(() => {
    handleGetItems();
    return () => {};
  }, []);

  const handleClearAll = () => {
    clearAllItems("fav_store");

    setloading(false);
    handleGetItems();

    toast.error(`cleared all colors`);
  };

  const handleAlert = () => {
    setalert((prev: any) => !prev);
  };

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
    <div className="flex-1 flex flex-col items-center">
      <TopHeader
        items={items}
        icon={<i className="fi fi-rr-palette mt-1"></i>}
        handleClearAll={handleClearAll}
        handleGetItems={handleGetItems}
        store="fav_store"
      />
      <MasonryFav
        items={items}
        setitems={setitems}
        handleGetItems={handleGetItems}
      />
      {alert && (
        <Alert
          handleAlert={handleAlert}
          handleAction={handleClearAll}
          text="Are you sure you want to clear all colors ?"
          buttonOne="cancel"
          buttonTwo="clear all"
        />
      )}
    </div>
  );
};

export default Page;
