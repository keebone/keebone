import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Icons from "../utils/moduels/icons";
import AsideRight from "../components/common/AsideRight";
import AsideLeft from "../components/common/AsideLeft";
import CanvasContral from "../components/common/CanvasContral";
import useToggleStates from "../utils/moduels/useToggleStates";
import Top from "../components/common/Top";

function Svg() {
  const {
    showLeftAside,
    toggleLeftAside,
    showRightAside,
    toggleRightAside,
    showMenuList,
    toggleMenuList,
    showAnimator,
    toggleAnimator,
  } = useToggleStates();

  //调用localDB
  //传送frames内容,空数数
  const [eles, setEles] = useState([]); //我显示的是这个frame的数组内容
  const [selectedElementKey, setSelectedElement] = useState(null); //选择的是来自frame的对象
  const handleSelectElement = (element) => {
    setSelectedElement(element);
    console.log("Selected element:", element);
  };

  const { id } = useParams();
  const parsedId = parseInt(id, 10);

  //调用localDB
  const [file, setFile] = useState([]);


  const fetchData = async () => {
    try {
      const contents = await window.$localDB.getAll("contents");
      const files = await window.$localDB.get("files", parsedId);
      const filteredFrames = contents.filter(
        (item) => item.fileid === parsedId
      );
      setEles(filteredFrames);
      setFile(files);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  useEffect(() => {
    if (parsedId) {
      fetchData();
    }
  }, [parsedId]); // include id in the dependency array

  if (!file) {
    return <div>Loading...</div>;
  }

  const handleElementChange = async (updatedElement) => {
    console.log(updatedElement);
    try {
      // 更新 frames 状态中的元素
      setEles((prevFrames) =>
        prevFrames.map((ele) =>
          ele.uuid === updatedElement.uuid ? updatedElement : ele
        )
      );

      setSelectedElement(updatedElement);
      window.$localDB.update("contents", updatedElement);
    } catch (error) {
      console.error("Error updating element:", error);
    }
  };

  const handleAddToStoreContents = async (item) => {
    try {
      await window.$localDB.set("contents", item);
      console.log("Item added to contents store:", item);
    } catch (error) {
      console.error("Error adding item to contents store:", error);
    }
  };
  const handleAddFrame = () => {
    const newFrame = {
      fileid: parsedId,
      uuid: Date.now(),
      type: "Frame",
      class: [
        "tempfilter"
      ],
      style: {
        width: "100",
        height: "100",
        rotate: "0",
        borderRadius: "0",
        backgroundImage:
          "https://images.pexels.com/photos/24280095/pexels-photo-24280095/free-photo-of-an-armchair-and-a-basket-of-flowers-standing-in-a-garden.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        backgroundColor: "#FF0022",
      },
    };

    setEles((prevFrames) => [...prevFrames, newFrame]);
    handleAddToStoreContents(newFrame);
  };

  //开启并闭左右侧栏

  return (
    <div className="contrain">
      <Top file={file} />

      <nav>
        <ul>
          <li>
            <span onClick={toggleMenuList}>
              <Icons name="k" />
            </span>
            {showMenuList && (
              <div className="subnav levela">
                <span onClick={toggleLeftAside}>
                  <div>Toggle Left Side</div>
                  <div style={{ paddingLeft: "4rem" }}>Ctrl + [</div>
                </span>
                <span onClick={toggleRightAside}>
                  <div>Toggle Right Side</div>
                  <div style={{ paddingLeft: "4rem" }}>Ctrl + ]</div>
                </span>
                <span onClick={toggleAnimator}>
                  <div>Toggle Animator</div>
                  <div style={{ paddingLeft: "4rem" }}>Ctrl + \</div>
                </span>
              </div>
            )}
          </li>
          <li className="activetool">
            <span className="imain">
              <Icons name="pointer" />
            </span>
          </li>
          <li>
            <span className="imain">
              <Icons name="move" />
            </span>
          </li>
          <li>
            <span className="imain" onClick={handleAddFrame}>
              {" "}
              <Icons name="frame" />
            </span>
          </li>
          <li>
            <span className="imain">
              <Icons name="rectangle" />
            </span>
          </li>
        </ul>
      </nav>
      <div className="canvas">
        {/* 根据状态来决定是否显示侧边栏 */}
        {showLeftAside && <AsideLeft />}
        <CanvasContral
          eles={eles}
          onElementSelect={handleSelectElement}
          showAnimator={showAnimator}
        />
        {showRightAside && (
          <AsideRight
            selectedElementKey={selectedElementKey}
            onDocumentData={file}
            onElementChange={handleElementChange}
          />
        )}
      </div>
    </div>
  );
}

export default Svg;