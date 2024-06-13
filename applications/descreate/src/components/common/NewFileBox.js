import React, { useState, useEffect } from "react";
import Icons from "../../utils/moduels/icons";

function NewFileBox({ id, onClose, onUpdate }) {
  // 处理确认事件
  const handleConfirm = () => {
    console.log(`Confirmed action for item with id: ${id}`);
    onClose(); // 调用 onClose 回调函数关闭 ConfirmBox
  };

  const [inputName, setInputName] = useState('');
  const [uuid, setUuid] = useState('');
  const [created, setCreated] = useState('');

  useEffect(() => {
    // 生成新的 UUID 并设置到 state 中
    let guuid = window.$keeBone.generate.uuid
    setUuid(guuid);
    setInputName(guuid);
    setCreated(window.$keeBone.generate.date);
  }, []); // 依赖空数组，确保只在组件挂载时生成 UUID


  const handleAdd = async () => {

    const value = { descreateId: uuid, descreateName: inputName, descreateCreated: created };
    await window.$localDB.set("descreate",value);
    setInputName(''); // 清空输入框
    onClose();
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
          <span
            style={{ color: "gray", paddingLeft: "1rem", fontSize: "10px" }}
          >
            / {uuid} {" "}
          </span>
          <span onClick={onClose}>
            <span className="ireverse"><Icons name="close" /></span>
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
            <input
              placeholder="Untitled"
              className="inputfull"
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            ></input>
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
            d.createDate
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            paddingTop: "1rem",
          }}
        >
          {/* <button onClick={onClose}>Cancel</button> */}
          <button type="submit" onClick={handleAdd}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewFileBox;
