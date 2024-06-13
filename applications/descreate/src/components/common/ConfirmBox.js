import React, { useState, useEffect } from "react";
import Icons from "../../utils/moduels/icons";

function ConfirmBox({id, onClose, item,onUpdate}) {
    // 处理确认事件
    const handleConfirm = () => {
      console.log(`Confirmed action for item with id: ${id}`);
      onClose(); // 调用 onClose 回调函数关闭 ConfirmBox
    };
    const [data, setData] = useState([]);
    const handleDeleteClick = async()=>{
      console.log(item.id)
      // 在按钮点击时调用父组件传递过来的删除函数
      // handleDeleteItem(id);
      await window.$localDB.delete('files',item.id);
      await window.$localDB.deleteBy("contents", "fileid", item.id);
      setData([]);
     onClose(); // 调用 onClose 回调函数关闭 ConfirmBox
      if (onUpdate) {
        onUpdate(); // 通知父组件更新数据
      }
    };
  

  return (
    <div className="popups">
      <div className="popupsbox">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 0 1rem 0",
          }}
        >
          <i>x</i>
          <span
            style={{ color: "gray", paddingLeft: "1rem", fontSize: "10px" }}
          >
            {" "}
            / {item.id}{" "}
          </span >
          <span onClick={onClose} className="ireverse">
          <Icons name="close"/>
          </span>
        </div>
        <div
          style={{ borderTop: "1px solid rgba(0,0,0,.1)", paddingTop: "1rem" }}
        >
          <div
            style={{
              textAlign: "right",
              fontSize: "16px",
              fontWeight: "bolder",
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: "12px",
              padding: "8px 0",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            {" "}
            width X height
            <span className="imini">
              <Icons name="size" />
            </span>
          </div>
          <div style={{ textAlign: "right", color: "gray", fontSize: "12px" }}>
            item
          </div>
        </div>
        <div style={{display:'flex', justifyContent:"right", paddingTop:'1rem'}}>
        {/* <button onClick={onClose}>Cancel</button> */}
        <button type="submit" className="dangerbutton" onClick={handleDeleteClick} >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBox;
