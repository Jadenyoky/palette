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
    setloading(true);
  };

  useEffect(() => {
    handleGetItems();
    return () => {};
  }, []);

  if (!items) return <div>No colors yet</div>;
  if (!loading) return <div>loading</div>;
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
