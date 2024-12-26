import { openDB } from 'idb';

const dbPromise = openDB('comics', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('data')) {
      db.createObjectStore("data");
    }
  }
})

export async function saveToDB(data) {
 const db = await dbPromise;
  const tx = db.transaction("data", "readwrite");
  const store = tx.objectStore("data");
  data.forEach((comic, index) => {
    store.put(comic, index); 
  });

  await tx.done;
}

export async function getFromDB() {
  const db = await dbPromise;
  return await db.getAll('data');
}