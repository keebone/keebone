// src/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'myDatabase';
const STORE_NAME = 'myStore';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
  },
});

export const addData = async (data) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(data);
  await tx.done;
};

export const getData = async (id) => {
  const db = await dbPromise;
  return await db.get(STORE_NAME, id);
};

export const getAllData = async () => {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
};

export const deleteData = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};
