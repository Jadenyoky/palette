"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Aos from "aos";

const Top = () => {
  const pathname = usePathname();

  const router = useRouter();
  const handleNavigation = (location: string) => {
    router.push(location);
  };

  const links = [
    {
      name: "store",
      location: "/store",
      icon: "fi-rr-gallery",
      acitve: "fi-sr-gallery",
    },
    {
      name: "create",
      location: "/",
      icon: "fi fi-rr-add-image",
      acitve: "fi fi-sr-add-image",
    },
    {
      name: "fav",
      location: "/fav",
      icon: "fi-rr-heart",
      acitve: "fi-sr-heart",
    },
  ];

  useEffect(() => {
    Aos.init({
      offset: 0,
      once: false,
    });
  }, []);

  return (
    <div className="sticky bottom-0 mx-auto max-md:mx-0" data-aos="fade-in">
      <div className="relative p-2 gap-4 rounded-full w-[600px] max-md:w-full mb-4 max-md:mb-0 max-md:rounded-[24px_24px_0px_0px] flex justify-between items-center  text-black *:flex-1 *:text-center overflow-hidden border border-black/10 bg-white/90 backdrop-blur-md max-md:shadow-[0px_-30px_30px] shadow-[-10px_30px_30px] shadow-white/90">
        {links.map((link, i) => {
          const isActive = link.location === pathname;
          return (
            <button
              type="button"
              key={i}
              className={`flex justify-center gap-4 max-md:gap-3 items-center text-black/70
                ${
                  isActive
                    ? "text-cyan-500 opacity-100 hover:bg-transparent"
                    : "opacity-50"
                }
                rounded-full w-fit px-4 py-2
                hover:bg-cyan-100 *:transition *:duration-1000 cursor-pointer`}
              onClick={() => handleNavigation(link.location)}
            >
              <i
                key={isActive ? 1 : 0}
                className={`${
                  isActive ? link.acitve : link.icon
                } text-lg mt-1 ${isActive ? "" : ""} `}
                data-aos="fade-in"
              />
              <p
                className={`max-md:text-sm font-semibold capitalize ${
                  isActive ? "" : "hidden"
                }`}
                data-aos="zoom-in"
              >
                {link.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Top;
