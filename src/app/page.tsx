"use client";
import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";
import {
  ItemTypes,
  addItem,
  deleteItem,
  clearAllItems,
  getAllItems,
  getItem,
} from "./db";
import { v4 } from "uuid";

const Page = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [urlImage, seturlImage] = useState<string>("");
  const [colors, setcolors] = useState<string[]>([]);
  const [randomColorId, setrandomColorId] = useState<number>(0);
  const [addedToFav, setaddedToFav] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (!file) return;

    setImageLoaded(false);
    setloading(false);
    const url = URL.createObjectURL(file);
    console.log(url);
    seturlImage(url);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    console.log(img, img.src);

    img.onload = async () => {
      handleExtract(img, file);
    };
  };

  const handleExtract = async (img: HTMLImageElement, file: any) => {
    const extract = new ColorThief();
    const color: ColorThief.RGBColor[] = extract.getPalette(img, 5);
    console.log(color);
    setcolors(color as []);

    const num = Math.floor(Math.random() * color.length);
    setrandomColorId(num);

    console.log(file);

    const item: ItemTypes = {
      id: v4(),
      name: file.name,
      blob: file,
      createdAt: Date.now(),
      palette: color,
      shadow: convertToHex(color[num][0], color[num][1], color[num][2]),
    };
    await addItem("items_store", item);
    console.log("Image added to IndexedDB");

    sessionStorage.setItem("currentItem", item.id as any);

    setTimeout(() => {
      setImageLoaded(true);
      setloading(true);
    }, num * 400);
  };

  const handleDelete = () => {
    setImageLoaded(false);
    sessionStorage.removeItem("currentItem");
  };

  const handleFav = () => {
    setaddedToFav(!addedToFav);
  };

  const handleCurrentItem = async () => {
    const storedId = sessionStorage.getItem("currentItem");

    if (!storedId) {
      return setloading(true);
    }

    const item = await getItem("items_store", storedId);
    console.log(item);

    const url = URL.createObjectURL(item.blob);
    seturlImage(url);

    setcolors(item.palette);
    setrandomColorId(Math.floor(Math.random() * item.palette.length));

    setloading(true);
    setImageLoaded(true);
  };

  useEffect(() => {
    handleCurrentItem();
  }, []);

  const convertToHex = (
    r: string | number,
    g: string | number,
    b: string | number
  ) => {
    const hex = `#${[r, g, b]
      .map((x) => {
        const h = x.toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("")}`;

    console.log(hex);
    return hex;
  };

  return (
    <div className="flex-1 gap-8 flex flex-col pt-4 justify-center items-center">
      <div className="w-full flex flex-col items-center">
        <div className=" flex justify-between w-full px-4 max-md:px-0 max-md:w-10/12 ">
          {loading ? (
            <button
              key={imageLoaded ? "replace" : "upload"}
              className={` font-[maven_pro] capitalize  text-black/50 rounded-full w-fit text-nowrap hover:bg-cyan-500/10 transition cursor-pointer ${
                imageLoaded ? "mx-0" : "mx-auto"
              }`}
              onClick={() => {
                inputFile.current?.click();
              }}
            >
              {imageLoaded ? (
                <div
                  className="flex gap-2 justify-center items-center pr-4"
                  data-aos="zoom-in"
                >
                  <div className="h-10 w-10 rounded-full flex justify-center items-center bg-cyan-500/10 text-green-500">
                    <i className="fi fi-tr-replace mt-1 text-lg"></i>
                  </div>
                  <p>replace</p>
                </div>
              ) : (
                <div
                  className="flex gap-2 justify-center items-center pr-4"
                  data-aos="fade-up"
                >
                  <div className="h-10 w-10 rounded-full flex justify-center items-center bg-green-500/10 text-green-500">
                    <i className="fi fi-tr-progress-upload mt-1 text-lg"></i>
                  </div>
                  <p>upload image</p>
                </div>
              )}
              <input
                ref={inputFile}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </button>
          ) : (
            <div className={`${imageLoaded ? "mx-0" : "mx-auto"} loader`}></div>
          )}

          {imageLoaded && (
            <div className="flex gap-4">
              <div
                key={addedToFav ? "fav" : "unfav"}
                className="border border-cyan-500/20 text-cyan-500/50 flex justify-center items-center w-10 h-10 rounded-full hover:bg-cyan-100 transition cursor-pointer"
                onClick={handleFav}
                data-aos="fade-in"
              >
                {addedToFav ? (
                  <i className="fi fi-sr-heart mt-1" data-aos="zoom-in"></i>
                ) : (
                  <i className="fi fi-rr-heart mt-1" data-aos="zoom-out"></i>
                )}
              </div>
              <div
                className="border border-red-500/20 text-red-500/50 flex justify-center items-center w-10 h-10 rounded-full hover:bg-red-100 transition cursor-pointer"
                onClick={handleDelete}
                data-aos="fade-in"
                data-aos-delay="100"
              >
                <i className="fi fi-rr-trash mt-1"></i>
              </div>
            </div>
          )}
        </div>
        <div className="max-md:max-w-11/12 max-md:mx-auto ">
          <div className="relative max-h-[400px] rounded-2xl mt-4 p-4 flex flex-col">
            {imageLoaded && (
              <div key={urlImage} className="flex-1" data-aos="zoom-in">
                <div
                  className="absolute animate-rotate top-4 left-0 w-full h-full blur-3xl -z-1 overflow-hidden "
                  style={{
                    backgroundColor: `rgba(${colors[randomColorId][0]}, ${colors[randomColorId][1]}, ${colors[randomColorId][2]},0.3)`,
                  }}
                />
                <img
                  src={urlImage}
                  className="max-md:max-h-[300px] max-h-[350px] rounded-2xl object-contain p-2 overflow-hidden "
                  alt=""
                  style={{
                    // transform: "translateY(-10px)",
                    boxShadow: `inset 0 0 50px rgba(${colors[randomColorId][0]}, ${colors[randomColorId][1]}, ${colors[randomColorId][2]},0.5)`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {imageLoaded && colors.length > 0 && (
        <div
          className="flex-1 w-full flex gap-4 justify-between items-center max-md:w-11/12"
          key={urlImage}
          data-aos="fade-up"
        >
          {colors.map((color, i) => {
            const handleCopy = () => {
              const hex = convertToHex(color[0], color[1], color[2]);
              navigator.clipboard.writeText(hex);
              console.log(hex, "copied", color, i);
            };

            const handleFavs = async () => {
              const hex: string = convertToHex(color[0], color[1], color[2]);
              const favColor = {
                id: v4(),
                hex: hex,
                rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                createdAt: Date.now(),
              };
              await addItem("fav_store", favColor);
            };

            return (
              <div
                key={i}
                className={`relative w-12 h-12 
                rounded-full cursor-pointer `}
                style={{
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  boxShadow: ` 0 0 0 5px rgba(${colors[randomColorId][0]}, ${colors[randomColorId][1]}, ${colors[randomColorId][2]},0.1)`,
                }}
                data-aos="zoom-out"
                data-aos-delay={100 + i * 100}
              >
                <div
                  className="absolute -bottom-7 -right-1 bg-white w-6 h-6 rounded-full flex justify-center items-center text-black/30"
                  data-aos="zoom-out"
                  data-aos-delay={400 + i * 100}
                  onClick={() => {
                    handleFavs();
                  }}
                >
                  <i className={`fi fi-rr-heart mt-1 text-sm`}></i>
                </div>
                <div
                  className="absolute -top-7 -left-1 bg-white w-6 h-6 rounded-full flex justify-center items-center text-black/30"
                  data-aos="zoom-out"
                  data-aos-delay={450 + i * 100}
                  onClick={() => {
                    handleCopy();
                  }}
                >
                  <i className={`fi fi-rr-copy mt-1 text-sm`}></i>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
