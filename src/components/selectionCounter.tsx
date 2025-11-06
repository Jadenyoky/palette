"use client";
import React, { useEffect, useState } from "react";

const SelectionCounter = React.memo(() => {
  const [idList, setidList] = useState<any>([]);

  useEffect(() => {
    const ids = JSON.parse(sessionStorage.getItem("select") || "[]");
    setidList(ids);

    const handleUpdate = () => {
      const updated = JSON.parse(sessionStorage.getItem("select") || "[]");
      setidList(updated);
    };

    window.addEventListener("ids-updated", handleUpdate);
    return () => window.removeEventListener("ids-updated", handleUpdate);
  }, []);

  if (idList.length === 0) return null;
  return <div>{idList.length}</div>;
});

export default SelectionCounter;
