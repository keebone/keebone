// localDB.js
import { openDB } from 'idb';

class LocalDB {
  constructor() {
    this.dbPromise = openDB('localDBkeebone', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('config')) {
          db.createObjectStore('config', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('descreate')) {
          db.createObjectStore('descreate', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('contents')) {
          db.createObjectStore('contents', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async get(storeName, key) {
    return (await this.dbPromise).get(storeName, key);
  }

  async set(storeName, value) {
    return (await this.dbPromise).put(storeName, value);
  }

  async delete(storeName, key) {
    return (await this.dbPromise).delete(storeName, key);
  }
  async deleteBy(storeName, fieldName, value) {
    const db = await this.dbPromise;
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const index = store.index(fieldName); // 使用字段名称作为索引
  
    const request = index.getAll(value); // 获取所有与特定字段值匹配的项目
    request.onsuccess = (event) => {
      const items = event.target.result;
      items.forEach((item) => {
        store.delete(item.id); // 删除每个匹配的项目
      });
    };
  
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async clear(storeName) {
    return (await this.dbPromise).clear(storeName);
  }

  async update(storeName, key) {
	return (await this.dbPromise).put(storeName, key);
  }

  // async update(storeName, key, value) {
  //   const db = await this.dbPromise;
  //   const transaction = db.transaction(storeName, 'readwrite');
  //   const store = transaction.objectStore(storeName);
  //   const request = store.put(value, key);

  //   return new Promise((resolve, reject) => {
  //     request.onsuccess = () => {
  //       resolve(request.result);
  //     };
  //     request.onerror = (event) => {
  //       reject(event.target.error);
  //     };
  //   });
  // }

  async getAll(storeName) {
    return (await this.dbPromise).getAll(storeName);
  }
}

// 单例模式
const localDB = new LocalDB();
export default localDB;
