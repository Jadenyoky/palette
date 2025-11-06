"use client";
import React, { useEffect, useState } from "react";
import LogoLoop from "@/components/LogoLoop";

const Page = () => {
  const skills = [
    {
      alt: "html",
      src: "skills/html-5.png",
    },
    {
      alt: "css",
      src: "skills/css-3.png",
    },
    {
      alt: "javascript",
      src: "skills/js.png",
    },
    {
      alt: "api",
      src: "skills/api.png",
    },
    {
      alt: "react",
      src: "skills/react.png",
    },
    {
      alt: "next",
      src: "skills/next.png",
    },
    {
      alt: "tailwind",
      src: "skills/tailwind.png",
    },
    {
      alt: "pwa",
      src: "skills/pwa.png",
    },
    {
      alt: "firebase",
      src: "skills/firebase.png",
    },
  ];

  return (
    <div className="columns-5 gap-4 p-4">
      {/* <LogoLoop
        logos={skills}
        speed={60}
        direction="right"
        logoHeight={36}
        gap={30}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#333"
        ariaLabel="Technology partners"
      /> */}
      {/* <img
        className="bg-cyan-500"
        src={`asset1.svg`}
        style={{
          maskImage: "url(asset2.svg)",
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
        }}
      />
      <img src={`asset2.svg`} />
      <img src={`asset1.svg`} />
      <img src={`asset2.svg`} />
      <img src={`asset1.svg`} /> */}
      <div
        className="bg-cyan-500 aspect-square"
        style={{
          maskImage: "url('asset1.svg')",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      ></div>
      <div
        className="bg-cyan-500 aspect-square"
        style={{
          maskImage: "url('asset2.svg')",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      ></div>{" "}
      <div
        className="bg-cyan-500 aspect-square"
        style={{
          maskImage: "url('asset1.svg')",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      ></div>{" "}
      <div
        className="bg-cyan-500 aspect-square"
        style={{
          maskImage: "url('asset2.svg')",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      ></div>{" "}
      <div
        className="bg-cyan-500 aspect-square"
        style={{
          maskImage: "url('asset2.svg')",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default Page;
