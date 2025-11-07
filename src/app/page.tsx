"use client";
import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";
import { ItemTypes, addItem, getItem } from "./db";
import { v4 } from "uuid";
import PaletteColor from "@/components/paletteColor";
import { toast } from "sonner";

const Page = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [urlImage, seturlImage] = useState<string>("");
  const [colors, setcolors] = useState<string[]>([]);
  const [randomColorId, setrandomColorId] = useState<number>(0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (!file) return;

    setImageLoaded(false);
    setloading(false);
    const url = URL.createObjectURL(file);
    seturlImage(url);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = async () => {
      handleExtract(img, file);
    };
  };

  const handleExtract = async (img: HTMLImageElement, file: any) => {
    document.body.style.overflow = "hidden";

    const extract = new ColorThief();
    const color: ColorThief.RGBColor[] = extract.getPalette(img, 5);
    setcolors(color as []);

    const num = Math.floor(Math.random() * color.length);
    setrandomColorId(num);

    const item: ItemTypes = {
      id: v4(),
      name: file.name,
      blob: file,
      createdAt: Date.now(),
      palette: color,
      shadow: convertToHex(color[num][0], color[num][1], color[num][2]),
    };
    await addItem("items_store", item);

    sessionStorage.setItem("currentItem", item.id as any);

    setTimeout(() => {
      setImageLoaded(true);
      setloading(true);
    }, num * 400);

    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 300 + num * 400);
  };

  const handleDelete = () => {
    setImageLoaded(false);
    sessionStorage.removeItem("currentItem");
  };

  const handleCurrentItem = async () => {
    document.body.style.overflow = "hidden";

    const storedId = sessionStorage.getItem("currentItem");

    if (!storedId) {
      document.body.style.overflow = "auto";
      return setloading(true);
    }

    const item = await getItem("items_store", storedId);

    const url = URL.createObjectURL(item.blob);
    seturlImage(url);

    setcolors(item.palette);
    setrandomColorId(Math.floor(Math.random() * item.palette.length));

    setloading(true);
    setImageLoaded(true);

    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 300);
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

    return hex;
  };

  const [change, setchange] = useState<boolean>(false);

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
        <div className="max-md:max-w-11/12 max-md:mx-auto relative">
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
                    boxShadow: `inset 0 0 50px rgba(${colors[randomColorId][0]}, ${colors[randomColorId][1]}, ${colors[randomColorId][2]},0.5)`,
                  }}
                />
              </div>
            )}
          </div>
          {imageLoaded && (
            <button
              data-aos="zoom-in"
              data-aos-delay="400"
              type="button"
              onClick={() => {
                setchange(!change);
                toast.info("shapes changed");
              }}
              className="absolute bottom-0 right-0 w-12 h-12 bg-white shadow-xl border-cyan-500 hover:text-cyan-500 rounded-full transition cursor-pointer flex items-center justify-center text-[var(--color1)]"
              style={{
                background: "white",
                maskImage: `url('/blobs/Asset 4.svg')`,
                maskRepeat: "no-repeat",
                maskSize: "contain",
                maskPosition: "center",
              }}
            >
              <i className="fi fi-ss-sparkles mt-2 text-xl"></i>
            </button>
          )}
        </div>
      </div>

      {imageLoaded && colors.length > 0 && (
        <div
          className="relative flex-1 w-full grid grid-cols-5 max-md:flex max-md:flex-wrap gap-8 justify-between items-center max-md:w-11/12 max-sm:justify-evenly"
          // key={urlImage}
          key={change ? "one" : "two"}
        >
          {colors.map((color, i) => {
            return (
              <PaletteColor
                key={i}
                num={i}
                colors={colors}
                color={color}
                randomColorId={randomColorId}
                convertToHex={convertToHex}
                randomShape={"/blobs/Asset 1.svg"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
