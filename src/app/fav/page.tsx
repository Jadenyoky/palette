"use client";
import React, { useEffect, useState } from "react";
import { getAllItems, ColorTypes } from "../db";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);

  const handleGetItems = async () => {
    const items = await getAllItems("fav_store");
    console.log(items);
    setitems(items);
    setTimeout(() => {
      setloading(true);
    }, 1000);
  };

  useEffect(() => {
    handleGetItems();
    return () => {};
  }, []);

  if (!loading)
    return (
      <div className="flex-1 border flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  if (items.length === 0) return <div>No colors yet</div>;
  return (
    <div className="border flex-1 gap-4 flex flex-col justify-between items-center">
      {items.map((color: ColorTypes, i: number) => {
        return (
          <div
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
