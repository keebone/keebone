import React, { createContext, useContext } from 'react';

const IndexedDBContext = createContext();

export const useIndexedDB = () => useContext(IndexedDBContext);

export default IndexedDBContext;