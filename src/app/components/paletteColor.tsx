"use client";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { addItem, deleteItem, getAllItems } from "../db";
import _ from "lodash";
import { toast } from "sonner";

const PaletteColor = ({
  color,
  convertToHex,
  num,
  randomColorId,
  colors,
}: any) => {
  const [options, setoptions] = useState<boolean>(false);
  const [copied, setcopied] = useState<boolean>(false);
  const [faved, setfaved] = useState<boolean>(false);
  const handleOptions = () => {
    setoptions(!options);
  };
  const handleCopy = () => {
    setcopied(true);

    const hex = convertToHex(color[0], color[1], color[2]);
    navigator.clipboard.writeText(hex);
    setTimeout(() => {
      setcopied(false);
    }, 2000);

    toast.info(`copy color to clipboard`);
  };

  const handleFavs = async () => {
    const check = await handleCheck();

    if (check) {
      await deleteItem("fav_store", check.id);
      setfaved(false);

      toast.error(`removed color from fav`);
    } else {
      const hex: string = convertToHex(color[0], color[1], color[2]);
      const favColor = {
        id: v4(),
        hex: hex,
        rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        createdAt: Date.now(),
      };
      await addItem("fav_store", favColor);
      setfaved(true);
      toast.success(`added color to fav`);
    }
  };

  const handleCheck = async () => {
    const items = await getAllItems("fav_store");
    const hex: string = convertToHex(color[0], color[1], color[2]);
    const find = items.find((i: any) => i.hex === hex);
    if (find) {
      console.log(find);
      setfaved(true);
      // setoptions(true);
    }
    return find;
  };

  const [randomNum, setrandomNum] = useState<number>(1);

  const handleRandomShape = () => {
    const random = Math.floor(Math.random() * 33);
    setrandomNum(random);
    console.log(random);
  };

  useEffect(() => {
    handleCheck();
    handleRandomShape();
  }, []);

  return (
    <div
      className={`relative rounded-md cursor-pointer  ${
        faved ? "anim1" : "float-up2"
      }
      hover:scale-105 transition 
      min-w-20
      `}
      onClick={handleOptions}
    >
      {/* <div
        className="h-full w-full rounded-md anim2"
        style={{
          backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          boxShadow: ` 0 0 0 5px rgba(${colors[randomColorId][0]}, ${colors[randomColorId][1]}, ${colors[randomColorId][2]},0.1)`,
        }}
      ></div> */}
      <div
        className="bg-cyan-500 aspect-square"
        style={{
          maskImage: `url('/blobs/Asset ${randomNum || 1}.svg')`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          boxShadow: ` 0 0 0 5px rgba(${colors[randomColorId][0]}, ${colors[randomColorId][1]}, ${colors[randomColorId][2]},0.1)`,
        }}
      ></div>
      {options && (
        <div className="absolute -top-6 right-0 flex gap-4 w-full justify-between max-sm:justify-center">
          <div
            className=" bg-white w-6 h-6 p-4 border rounded-full flex justify-center items-center text-green-500/50 hover:text-green-500 transition"
            data-aos="zoom-in"
            onClick={(e) => {
              e.stopPropagation();
              handleFavs();
            }}
          >
            {faved ? (
              <i className={`fi fi-sr-heart mt-1 text-green-500/50`}></i>
            ) : (
              <i
                className={`fi fi-rr-heart mt-1 text-amber-500/70 hover:text-amber-500`}
              ></i>
            )}
          </div>
          <div
            data-aos="zoom-in"
            className={`bg-white w-6 h-6 p-4 border rounded-full flex justify-center items-center  hover:text-amber-500 transition`}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            {copied ? (
              <i className={`fi fi-br-check mt-1 text-green-500/50`}></i>
            ) : (
              <i
                className={`fi fi-rr-copy mt-1 text-amber-500/70 hover:text-amber-500`}
              ></i>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteColor;
