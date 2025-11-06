"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import sal from "sal.js";
import AlertShad from "./alertShad";
import { deleteItem } from "@/app/db";
import Counter from "./counterBits";
import { toast } from "sonner";

const TopHeader = ({
  items,
  handleClearAll,
  icon,
  handleGetItems,
  store,
}: any) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    sal({
      root: document.querySelector(".topNav"),
      once: false,
      threshold: 0,
    });
  }, [pathname, router]);

  const [idList, setidList] = useState<any>([]);

  useEffect(() => {
    const ids = JSON.parse(sessionStorage.getItem("select") || "[]");
    setidList(ids);

    const handleUpdate = () => {
      const updated = JSON.parse(sessionStorage.getItem("select") || "[]");
      setidList(updated);
    };

    window.addEventListener("ids-updated", handleUpdate);
    return () => sessionStorage.removeItem("select");
  }, []);

  const handleClearSelected = () => {
    const current = sessionStorage.getItem("currentItem");

    idList.forEach(async (id: any) => {
      if (current === id) {
        sessionStorage.removeItem("currentItem");
      }
      await deleteItem(store, id);
    });

    sessionStorage.removeItem("select");
    setidList([]);

    handleGetItems();

    toast.error(
      `clear ${idList.length} ${
        (store?.includes("fav") && "colors") ||
        (store?.includes("items") && "items")
      }`
    );
  };

  return (
    <div className="topNav w-full px-4 pl-6 py-2 sticky top-0  bg-white backdrop-blur-2xl flex justify-between items-center shadow-md shadow-amber-500/10 rounded-2xl z-29">
      <div
        className="flex items-center gap-2 font-[asap] capitalize"
        data-sal="zoom-in"
      >
        <div
          className="relative text-green-500 font-[maven_pro] flex justify-center items-center w-10 h-10 rounded-full border-2 border-green-500/20"
          data-sal="fade-in"
          data-sal-delay="100"
        >
          {icon && (
            <div className="bg-white w-5 h-5 p-3 rounded-full absolute -top-3 -left-2 flex items-center justify-center text-sm text-cyan-500">
              {icon}
            </div>
          )}
          {items.length}
        </div>
      </div>

      {idList.length > 0 ? (
        <AlertShad
          handleAction={handleClearSelected}
          title={
            <Counter
              value={idList.length}
              fontSize={18}
              places={
                idList.length <= 9
                  ? [1]
                  : idList.length >= 10
                  ? [10, 1]
                  : [100, 10, 1]
              }
            />
          }
          alertTitle={`Are you sure to clear ${idList.length} selected ${
            (store?.includes("fav") && "colors") ||
            (store?.includes("items") && "items")
          } ?`}
          description={`you can't recovery any ${
            (store?.includes("fav") && "colors") ||
            (store?.includes("items") && "items")
          } after this action`}
        />
      ) : (
        <AlertShad
          handleAction={handleClearAll}
          title={"Clear All"}
          alertTitle={`Are you sure to clear all ${
            (store.includes("fav") && "colors") ||
            (store.includes("items") && "items")
          } ?`}
          description={`you can't recovery any ${
            (store.includes("fav") && "colors") ||
            (store.includes("items") && "items")
          } after this action`}
        />
      )}
    </div>
  );
};

export default TopHeader;
