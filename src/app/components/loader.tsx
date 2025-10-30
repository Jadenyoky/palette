"use client";
import React from "react";

interface LoaderTypes {
  color1?: string;
  color2?: string;
  color3?: string;
}

const Loader = ({ color1, color2, color3 }: LoaderTypes) => {
  
  return (
    <div
      className="loader"
      style={{
        ["--color1" as any]: color1,
        ["--color2" as any]: color2,
        ["--color2" as any]: color3,
      }}
    ></div>
  );
};

export default Loader;
