"use client";
import { Masonry } from "masonic";
import React, { memo } from "react";
import ColorFav from "../components/colorFav";

const MasonryFav = ({ items, setitems, handleGetItems }: any) => {
  return (
    <div className="w-full p-4 flex items-center *:flex-1">
      {/* {items.map((color: ColorTypes, i: number) => {
                return <Fav key={i} color={color} num={i} />;
              })} */}
      <Masonry
        items={items}
        columnGutter={8}
        columnWidth={120}
        overscanBy={20}
        render={({ index, data }: any) => {
          return (
            <ColorFav
              key={index}
              color={data}
              num={index}
              setitems={setitems}
              handleGetItems={handleGetItems}
            />
          );
        }}
      />
    </div>
  );
};

export default memo(MasonryFav);
