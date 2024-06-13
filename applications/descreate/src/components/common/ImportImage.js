import React, { useState, useEffect, useRef } from "react";
import Icons from "../../utils/moduels/icons";

function ImportImage({ id, onClose, onUpdate, onDocumentData }) {

  // 处理确认事件
  const handleConfirm = () => {
    console.log(`Confirmed action for item with id: ${id}`);
    onClose(); // 调用 onClose 回调函数关闭 ConfirmBox
  };

  const [inputName, setInputName] = useState('');
  const [uuid, setUuid] = useState('');
  const [created, setCreated] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // 生成新的 UUID 并设置到 state 中
    let guuid = window.$keeBone.generate.uuid
    setUuid(guuid);
    setInputName(guuid);
    setCreated(window.$keeBone.generate.date);
  }, []); // 依赖空数组，确保只在组件挂载时生成 UUID

  const handleFileChange = (event) => {
	const files = Array.from(event.target.files);
	const promises = files.map((file) => convertToBase64(file));
	Promise.all(promises).then((base64Images) => {
	  setImages([...images, ...base64Images]);
	});
  };
  
  // 将图像文件转换为 Base64 格式
  const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(file);
	  reader.onload = () => resolve(reader.result);
	  reader.onerror = (error) => reject(error);
	});
  };
  
  const handleAdd = async () => {
    const created = new Date().toISOString(); // 获取创建时间
    const promises = images.map((image, index) => {
      const imageUuid = `${uuid}${index + 1}`;
      const item = {
		fileid: onDocumentData.id,
        uuid: imageUuid,
		type: `image`,
        name: inputName,
        created: created,
        imageData: image, // 包含图像数据
      };
      return window.$localDB.set("contents", item);
    });

    await Promise.all(promises);

    setInputName(''); // 清空输入框
    onClose();
    if (onUpdate) {
      onUpdate(); // 通知父组件更新数据
    }
  };



  const handleClick = () => {
    fileInputRef.current.click();
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
           Import Image / {uuid} {" "}
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

          <div className="importimagelist">
			<ul>
				<li onClick={handleClick}><span className="ireverse"><Icons name="add" /></span> </li> 
				{images.map((src, index) => (
				<li style={{
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${src})`,}} key={index} src={src} alt={`img-${index}`} ></li>
			))}
			</ul>
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
		  <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
        </div>
      </div>
    </div>
  );
}

export default ImportImage;
