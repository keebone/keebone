import React, { useState, useEffect } from "react";
import FileItem from "../components/common/FileItem";
import Icons from "../utils/moduels/icons";
import NewFileBox from "../components/common/NewFileBox";
import Header from "../components/common/Header";
// import { useIndexedDB } from '../indexedDB/IndexedDBContext';

function Home() {
  // const indexedDBUtils = useIndexedDB();

  const [showNewFileBox, setshowNewFileBox] = useState(false);
  const [createanewfile, setSelectedId] = useState(null);

  const handleIconClick = (id) => {
    setSelectedId(id);
    setshowNewFileBox(true);
  };

  const handleCloseConfirmBox = () => {
    setshowNewFileBox(false);
    setSelectedId(null);
  };


  //调用localDB
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      const allData = await window.$localDB.getAll('files');
      setData(allData);
    };

    useEffect(() => { fetchData(); }, []);

    const handleDataUpdate = async () => {
      await fetchData();
    };
  

    // const handleAdd = async () => {
    //   const value = { name: 'New Item', created: new Date() };
    //   await window.$localDB.set(value);
    //   const allData = await window.$localDB.getAll();
    //   setData(allData);
    // };
  
    // const handleClear = async () => {
    //   await window.$localDB.clear();
    //   setData([]);
    // };

    // const handleGetall = async () => {
    //   await window.$localDB.getAll();
    //   setData([]);
    // };

    // const handleDeleteItem = async(id)=>{
    //   console.log(id)
    //   await window.$localDB.delete(id);
    //   setData([]);
    // }


  return (
    <main>
      <Header/>
      {/* <nav className="windowcontral">
        <ul>
          <li style={{paddingLeft:'4rem'}}></li>
          <li>
            <a href="/"><span className="logo"><Icons name="keebone"/></span></a>
          </li>
          <li style={{fontSize:'12px'}}>Descreate</li>
        </ul>
        <ul style={{width:'100%'}} className="dragwindow">

        </ul>
      </nav> */}
      <div className="contral">
        <div className="filelist">
          <ul>
          {data.map(item => (
          <li key={item.id}>
            <FileItem item={item} onUpdate={handleDataUpdate}  />
          </li>
        ))}
 
          </ul>
        </div>
        <aside className="menu">
          <ul>
            {showNewFileBox && (
              <NewFileBox id={createanewfile} onClose={handleCloseConfirmBox} onUpdate={handleDataUpdate} />
            )}
            <li onClick={() => handleIconClick("uuid")}>
              <div style={{fontSize:'14px',fontWeight:'bolder', padding:'0 0 0 1rem',display:'flex',alignItems:'center', width:'100%'}}><span className="ireverse"><Icons name="file" /></span> New File </div>
              </li>
            {/* <li onClick={ handleAdd}> <Icons name="file" /><Icons name="file" className="" />  New File </li> */}
          </ul>
        </aside>
      </div>
    </main>
  );
}

export default Home;
