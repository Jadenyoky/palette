"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [items, setitems] = useState<{ id: number; isDeleting: boolean }[]>([]);

  const handleItems = () => {
    const newItems = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      isDeleting: false,
    }));
    setitems(newItems);
  };

  const handleDelete = (id: number) => {
    // أولاً نعمل فلاج للعنصر إنه بيتحذف
    setitems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDeleting: true } : item
      )
    );

    // بعد الأنيميشن نحذفه فعليًا
    setTimeout(() => {
      setitems((prev) => prev.filter((item) => item.id !== id));
    }, 300); // نفس مدة الترانزيشن
  };

  useEffect(() => {
    handleItems();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mx-auto p-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleDelete(item.id)}
          className={`w-12 h-12 border flex items-center justify-center cursor-pointer transition-all duration-300 ${
            item.isDeleting
              ? "opacity-0 scale-50"
              : "opacity-100 scale-100 hover:bg-red-200"
          }
          scale-90
          transition-all duration-300
          `}
        >
          {item.id}
        </div>
      ))}
    </div>
  );
};

export default Page;
