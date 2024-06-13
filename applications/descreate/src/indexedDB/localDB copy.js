// localDB.js
import { openDB } from 'idb';

class LocalDB {
  constructor() {
    this.dbPromise = openDB('localDBkeebone', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('store')) {
          db.createObjectStore('store', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async get(key) {
    return (await this.dbPromise).get('store', key);
  }

  async set(value) {
    return (await this.dbPromise).put('store', value);
  }

  async delete(key) {
    return (await this.dbPromise).delete('store', key);
  }

  async clear() {
    return (await this.dbPromise).clear('store');
  }

  async getAll() {
    return (await this.dbPromise).getAll('store');
  }
}

// 单例模式
const localDB = new LocalDB();
export default localDB;
