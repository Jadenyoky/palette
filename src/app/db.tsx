import { openDB } from "idb";

export interface ItemTypes {
  id: string | number;
  name: string;
  blob: Blob;
  createdAt: number;
}

export interface ColorTypes {
  id: string | number;
  hex: string;
  rgb: string;
  createdAt: number;
}

const db_name = "palette_db";
const store_items = "items_store";
const store_colors = "fav_store";

export const getDB = async () => {
  return openDB(db_name, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(store_items)) {
        const create = db.createObjectStore(store_items, {
          keyPath: "id",
        });
        create.createIndex("createdAt", "createdAt");
      }

      if (!db.objectStoreNames.contains(store_colors)) {
        const create = db.createObjectStore(store_colors, {
          keyPath: "id",
        });
        create.createIndex("createdAt", "createdAt");
      }
    },
  });
};

export const addItem = async (store: string, item: ItemTypes | ColorTypes) => {
  const db = await getDB();
  await db.add(store, { ...item });
};

export const getItem = async (store: string, id: any) => {
  const db = await getDB();
  const item = await db.get(store, id);
  return item;
};

export const getAllItems = async (store: string) => {
  const db = await getDB();
  const items = await db.getAll(store);
  return items;
};

export const deleteItem = async (store: string, id: any) => {
  const db = await getDB();
  await db.delete(store, id);
};

export const clearAllItems = async (store: string) => {
  const db = await getDB();
  await db.clear(store);
};
