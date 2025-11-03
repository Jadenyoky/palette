"use client";
import React, { memo, useEffect, useState } from "react";
import { clearAllItems, getAllItems, ItemTypes } from "../db";
import { usePathname, useRouter } from "next/navigation";
import _ from "lodash";
import Gallery from "../components/gallery";
import { Masonry } from "masonic";
import TopHeader from "../components/topHeader";

const Page = () => {
  const [items, setitems] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const handleGetItems = async () => {
    setloading(false);
    const items: ItemTypes[] = await getAllItems("items_store");
    // console.log(items);

    const order = _.orderBy(items, ["createdAt"], ["desc"]);

    setitems(order);

    const random = Math.floor(Math.random() * 5);
    // console.log(random);

    setTimeout(() => {
      setloading(true);
    }, random * 400);
  };

  const handleClearAll = () => {
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

  useEffect(() => {
    handleGetItems();
  }, []);

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
    <>
      <div className="flex-1 flex flex-col items-center">
        <TopHeader
          items={items}
          icon={<i className="fi fi-rr-gallery mt-1"></i>}
          handleClearAll={handleClearAll}
          handleGetItems={handleGetItems}
          store="items_store"
        />

        {/* <div className="columns-4 max-md:columns-4 max-sm:columns-3 space-y-4 p-4 ">
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
        </div> */}
        <div className="w-full p-4">
          <Masonry
            key={items.length}
            items={items}
            itemKey={(data: any) => data?.id ?? Math.random()}
            columnGutter={16}
            columnWidth={150}
            overscanBy={5}
            render={({ index, data }: any) => {
              console.log(index);

              return (
                <Gallery
                  key={data.id}
                  num={index}
                  item={data}
                  handleSelect={handleSelect}
                  setitems={setitems}
                  setloading={setloading}
                  handleGetItems={handleGetItems}
                />
              );
            }}
          />
        </div>
        {/* {alert && (
          <Alert
            handleAlert={handleAlert}
            handleAction={handleClearAll}
            text="Are you sure you want to clear all items ?"
            buttonOne="cancel"
            buttonTwo="clear all"
          />
        )} */}
      </div>
    </>
  );
};

export default Page;
