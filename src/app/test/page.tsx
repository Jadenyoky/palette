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
    <div className="fixed left-0 -top-4 flex justify-center items-center flex-wrap gap-4 mx-auto p-4 w-full bg-[#333] h-full">
      <LogoLoop
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
      />
    </div>
  );
};

export default Page;
