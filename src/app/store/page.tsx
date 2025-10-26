"use client";
import React, { useEffect, useState } from "react";
import { getAllItems } from "../db";
import ColorThief from "colorthief";
import { useRouter } from "next/navigation";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const handleGetItems = async () => {
    const items = await getAllItems();
    console.log(items);
    setitems(items);
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

  if (!items) return <div>loading</div>;
  return (
    <div className="border flex-1 gap-4 flex flex-col justify-between items-center">
      <div className="flex flex-wrap gap-1">
        {items.map((item: any, i: number) => {
          const url: any = URL.createObjectURL(item.blob);

          return (
            <div
              className="cursor-pointer"
              key={i}
              onClick={() => {
                handleSelect(item.id, "/");
              }}
            >
              <div className="rounded-full overflow-hidden p-2 bg-amber-400">
                <img
                  src={url}
                  alt={item.name}
                  className="object-cover rounded-full w-40 h-40"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
