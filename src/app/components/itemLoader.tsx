"use client";
import React, { useEffect, useState } from "react";
import sal from "sal.js";
import "sal.js/dist/sal.css";
import Loader from "./loader";
import _ from "lodash";

const GalleryItem = ({
  src,
  alt,
  delay,
  palette,
}: {
  src: string;
  alt: string;
  delay: number;
  palette: any;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    sal();
  }, []);

  const [loaderColors, setloaderColors] = useState<any>([]);

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

  useEffect(() => {
    if (palette) {
      const arr = palette.map((color: any) => {
        return convertToHex(color[0], color[1], color[2]);
      });
      setloaderColors(_.shuffle(arr));
    }
  }, [palette]);

  return (
    <div data-sal="fade" className="relative overflow-hidden rounded-2xl">
      {/* Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <Loader
            color1={loaderColors[0]}
            color2={loaderColors[1]}
            color3={loaderColors[2]}
          />
        </div>
      )}

      {/* الصورة */}
      {/* <img
        src={src}
        alt={alt}
        onLoad={() => {
          setTimeout(() => {
            setLoaded(true);
          }, 3000);
        }}
        className={`w-full h-auto transition-opacity `}
        data-sal="zoom-in"
        data-sal-delay={delay}
      /> */}
      <picture>
        <source
          srcSet={src}
          type="image/jpeg"
          className={`w-full h-auto transition-opacity ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-auto transition-opacity ${
            loaded ? "opacity-100" : "opacity-0"
          } `}
          onLoad={() => {
            setTimeout(() => {
              setLoaded(true);
            }, delay);
          }}
        />
      </picture>
    </div>
  );
};

export default GalleryItem;
