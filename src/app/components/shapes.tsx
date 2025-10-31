"use client";
import React, { useEffect, useState, useRef } from "react";
import { getAllItems } from "../db";
import _ from "lodash";
import "../styles/animations.css"; // هنا هنضيف ملف CSS فيه الحركات

const Shapes = () => {
  const [colors, setcolors] = useState<any>([]);
  const positionsRef = useRef<any[]>([]);

  const animations = [
    "float-up",
    "float-down",
    "float-left",
    "float-right",
    "rotate-slow",
    "pulse-fade",
  ];

  const handleColors = async () => {
    const items = await getAllItems("items_store");
    const filter = _.map(items, "shadow");
    const unique = _.uniq(filter);
    const random = _.sampleSize(unique, 25);

    setcolors(random);
    console.log(random);

    if (positionsRef.current.length === 0) {
      positionsRef.current = filter.map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${4}px`,
        height: `${4}px`,
        delay: `${Math.random() * 10}s`,
        anim: animations[Math.floor(Math.random() * animations.length)], // حركة عشوائية
      }));
    }
  };

  useEffect(() => {
    handleColors();
  }, []);

  return (
    <div className="fixed w-full h-full pointer-events-none overflow-hidden">
      {colors.map((item: any, i: number) => {
        const pos = positionsRef.current[i];
        return (
          <div
            key={i}
            className={`absolute rounded-full opacity-0 ${pos.anim}`}
            style={{
              backgroundColor: item,
              top: pos.top,
              left: pos.left,
              width: pos.width,
              height: pos.height,
              animationDelay: pos.delay,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Shapes;
