
const indexedDBUtils = {
    dbName: 'localDatabase',
    localPaint: 'localPaint',
    localBoard: 'localBoard',
    localLayer: 'localLayer',
    localLayerClass: 'localLayerClass', //样式
    localLayerText: 'localLayerText', //文本
    localLayerRectangle: 'localLayerRectangle', //矩形
    localLayerPolygon: 'localLayerPolygon', //多边形
    localClass: 'localClass',
    db: null,

    openDB(callback) {
        const request = window.indexedDB.open(this.dbName);
        request.onerror = (event) => {
            console.error('Database error: ', event.target.errorCode);
        };
        request.onsuccess = (event) => {
            this.db = request.result;
            callback();
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(this.localPaint)) {
                db.createObjectStore(this.localPaint, { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(this.localBoard)) {
                db.createObjectStore(this.localBoard, { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(this.localLayer)) {
                db.createObjectStore(this.localLayer, { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(this.localLayerClass)) {
                db.createObjectStore(this.localLayerClass, { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(this.localClass)) {
                db.createObjectStore(this.localClass, { autoIncrement: true });
            }
            //用于保存文本图层的样式
            if (!db.objectStoreNames.contains(this.localLayerText)) {
                db.createObjectStore(this.localLayerText, { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(this.localLayerRectangle)) {
                db.createObjectStore(this.localLayerRectangle, { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(this.localLayerPolygon)) {
                db.createObjectStore(this.localLayerPolygon, { autoIncrement: true });
            }
        };
    },

    addData(storeName,data) {
        this.openDB(() => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            store.add(data);
        });
    },

    updateData(storeName, key, newData) {
        this.openDB(() => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = (event) => {
                const oldData = event.target.result;
                Object.assign(oldData, newData);
                const updateRequest = store.put(oldData);
                updateRequest.onsuccess = (event) => {
                    console.log('Data updated successfully:', event.target.result);
                };
                updateRequest.onerror = (error) => {
                    console.error('Error updating data:', error);
                };
            };
            request.onerror = (error) => {
                console.error('Error fetching data for update:', error);
            };
        });
    },

    updateDataBy(storeName, condition, newData) {
        this.openDB(() => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.openCursor();
    
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const object = cursor.value;
                    if (object[condition.by] === condition.value) {
                        // 找到匹配的对象，更新数据
                        Object.assign(object, newData);
                        cursor.update(object);
                        console.log('Data updated successfully:', object);
                    }
                    cursor.continue();
                } else {
                    console.log('No more matching data found.');
                }
            };
    
            request.onerror = (error) => {
                console.error('Error fetching data for update:', error);
            };
        });
    },

    delDataBy(storeName, condition){
            this.openDB(() => {
                const transaction = this.db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.openCursor();
        
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const object = cursor.value;
                        if (object[condition.by] === condition.value) {
                            // 找到匹配的对象，删除它
                            cursor.delete();
                            console.log('Data deleted successfully:', object);
                        }
                        cursor.continue();
                    } else {
                        console.log('No more matching data found.');
                    }
                };
        
                request.onerror = (error) => {
                    console.error('Error fetching data for deletion:', error);
                };
            });
    },

    //清除不需要的内容
    delDataUndepen(storeName, condition) {
        this.openDB(() => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.openCursor();
    
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const object = cursor.value;
                    if (!condition.value.includes(object[condition.by])) {
                        // 找到匹配的对象，删除它
                        cursor.delete();
                        console.log('Data deleted successfully:', object);
                    }
                    cursor.continue();
                } else {
                    console.log('No more matching data found.');
                }
            };
    
            request.onerror = (error) => {
                console.error('Error fetching data for deletion:', error);
            };
        });
    },
    
    

    addOrUpdateData(key, data) {
        this.openDB(() => {
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key); // Assuming data has an 'id' property as the key
            console.log('我是addorupdata函数获得的key:', key)
            console.log('看看request是什么:', request)
    
            request.onsuccess = (event) => {
                const existingData = event.target.result;
    
                console.log("看看找到什么东西", existingData)
    
                if (existingData) {
                    console.log('存在')
                    // If data with the same key already exists, update it
                    const updateRequest = store.put(data);
                    updateRequest.onsuccess = (event) => {
                        console.log('Data updated successfully:', event.target.result);
                    };
                    updateRequest.onerror = (error) => {
                        console.error('Error updating data:', error);
                    };
                } 
                else {
                    console.log('不存在')
                    // If data doesn't exist, add it
                    const addRequest = store.add(data);
                    addRequest.onsuccess = (event) => {
                        console.log('Data added successfully:', event.target.result);
                    };
                    addRequest.onerror = (error) => {
                        console.error('Error adding data:', error);
                    };
                }
            };
    
            request.onerror = (error) => {
                console.error('Error fetching data:', error);
            };
        });
    },
    
    
    //所有
    getAllData(storeName) {
        return new Promise((resolve, reject) => {
            this.openDB(() => {
                const transaction = this.db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);
                const dataRequest = store.getAll();
                dataRequest.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                dataRequest.onerror = (error) => {
                    reject(error);
                };
            });
        });
    },

    //带条件的返回数据
    //
    getDataBy(storeName, condition) {
        return new Promise((resolve, reject) => {
            this.openDB(() => {
                const transaction = this.db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);
                const dataRequest = store.getAll();
                dataRequest.onsuccess = (event) => {
                    const allData = event.target.result;
                    if (condition && condition.by && condition.value !== undefined) {
                        const filteredData = allData.filter(item => item[condition.by] === condition.value);
                        resolve(filteredData);
                    } else {
                        resolve(allData);
                    }
                };
                dataRequest.onerror = (error) => {
                    reject(error);
                };
            });
        });
    },
    

    deleteDB() {
        window.indexedDB.deleteDatabase(this.dbName);
    }
};

export default indexedDBUtils;
