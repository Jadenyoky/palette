"use client";
import React, { useEffect, useState } from "react";
import sal from "sal.js";
import "sal.js/dist/sal.css";

const GalleryItem = ({
  src,
  alt,
  delay,
}: {
  src: string;
  alt: string;
  delay: number;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    sal();
  }, []);

  return (
    <div data-sal="fade" className="relative overflow-hidden rounded-2xl">
      {/* Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="loader"></div>
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
          }`}
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
