"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import sal from "sal.js";

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
    sal({
      root: document.querySelector(".bottomNav"),
      once: false,
      threshold: 0,
    });
  }, [pathname, router]);

  return (
    <div
      className="bottomNav fixed w-full max-h-[70px] bottom-0 flex justify-center items-center mx-auto max-md:mx-0 z-29"
      data-sal="fade"
    >
      <div className="relative p-2 gap-4 rounded-full w-[600px] max-md:w-full mb-4 max-md:mb-0 max-md:rounded-[24px_24px_0px_0px] flex justify-between items-center  text-black *:flex-1 *:text-center overflow-hidden border border-(--color1)/20 bg-white max-md:shadow-[0px_-20px_20px] shadow-[-10px_30px_30px] shadow-white/50">
        {links.map((link, i) => {
          const isActive = link.location === pathname;
          return (
            <button
              type="button"
              key={i}
              className={`flex justify-center gap-4 max-md:gap-3 items-center 
                ${
                  isActive
                    ? "opacity-100 hover:bg-transparent text-(--color2)/50"
                    : "opacity-50 text-black/70"
                }
                rounded-full w-fit px-4 py-2 
                hover:bg-(--color1)/50 *:transition *:duration-1000 cursor-pointer`}
              onClick={() => handleNavigation(link.location)}
            >
              <div
                key={isActive ? 1 : 0}
                data-sal="zoom-in"
                className={`
                   px-4 rounded-full flex justify-center items-center
                  ${isActive ? "bg-(--color1)/20 text-(--color1)" : ""}
                  `}
              >
                <i
                  className={`${isActive ? link.acitve : link.icon}  mt-1 ${
                    isActive ? "" : ""
                  } `}
                />
              </div>
              <p
                className={`max-md:text-sm font-semibold capitalize ${
                  isActive ? "" : "hidden"
                }`}
                data-sal="zoom-in"
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
