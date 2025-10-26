import { openDB } from "idb";

export interface ItemTypes {
  id: string | number;
  name: string;
  blob: Blob;
  createdAt: number;
}

const db_name = "palette_db";
const store_name = "palette_store";

export const getDB = async () => {
  return openDB(db_name, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(store_name)) {
        const store = db.createObjectStore(store_name, {
          keyPath: "id",
        });
        store.createIndex("createdAt", "createdAt");
      }
    },
  });
};

export const addItem = async (item: ItemTypes) => {
  const db = await getDB();
  await db.add(store_name, { ...item });
};

export const getItem = async (id: any) => {
  const db = await getDB();
  const item = await db.get(store_name, id);
  return item;
};

export const getAllItems = async () => {
  const db = await getDB();
  const items = await db.getAll(store_name);
  return items;
};

export const deleteItem = async (id: any) => {
  const db = await getDB();
  await db.delete(store_name, id);
};

export const clearAllItems = async () => {
  const db = await getDB();
  await db.clear(store_name);
};
