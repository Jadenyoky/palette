"use client";
import React, { useEffect, useState } from "react";
import { getAllItems } from "../db";
import ColorThief from "colorthief";
import { useRouter } from "next/navigation";
import _ from "lodash";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const handleGetItems = async () => {
    const items = await getAllItems("items_store");
    console.log(items);

    const order = _.orderBy(items, ["createdAt"], ["desc"]);

    setitems(order);
    setloading(true);
  };

  useEffect(() => {
    handleGetItems();
    return () => {};
  }, []);

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
    <div className="flex-1 gap-4 flex flex-col justify-between items-center">
      <div className="columns-4 max-md:columns-4 max-sm:columns-3 space-y-4 max-md:p-4 py-4">
        {items.map((item: any, i: number) => {
          const url: any = URL.createObjectURL(item.blob);

          return (
            <div
              className="cursor-pointer break-inside-avoid overflow-hidden rounded-xl shadow-md"
              key={i}
              onClick={() => {
                handleSelect(item.id, "/");
              }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <img src={url} alt={item.name} className="w-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
