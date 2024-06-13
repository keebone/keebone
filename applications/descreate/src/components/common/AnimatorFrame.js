import React, { useState } from 'react';

// 帧动画组件
const FrameAnimation = () => {
  // 初始化动画对象列表和当前选定的对象索引
  const [animationObjects, setAnimationObjects] = useState([]);
  const [selectedObjectIndex, setSelectedObjectIndex] = useState(null);

  // 添加新对象到动画列表
  const addObject = () => {
    const newObject = {
      keyframes: [{ time: 0, x: 0, y: 0 }],
    };
    setAnimationObjects([...animationObjects, newObject]);
  };

  // 删除指定索引的对象
  const deleteObject = (index) => {
    const updatedObjects = [...animationObjects];
    updatedObjects.splice(index, 1);
    setAnimationObjects(updatedObjects);
  };

  // 添加关键帧到指定对象
  const addKeyframe = (index) => {
    const updatedObjects = [...animationObjects];
    updatedObjects[index].keyframes.push({ time: 0, x: 0, y: 0 });
    setAnimationObjects(updatedObjects);
  };

  // 删除指定对象的指定索引的关键帧
  const deleteKeyframe = (objIndex, frameIndex) => {
    const updatedObjects = [...animationObjects];
    updatedObjects[objIndex].keyframes.splice(frameIndex, 1);
    setAnimationObjects(updatedObjects);
  };

  // 渲染对象列表
  const renderObjects = () => {
    return animationObjects.map((object, index) => (
      <div key={index}>
        <h3>Object {index + 1}</h3>
        {object.keyframes.map((frame, frameIndex) => (
          <div key={frameIndex}>
            <p>Keyframe {frameIndex + 1}</p>
            <button onClick={() => deleteKeyframe(index, frameIndex)}>Delete Keyframe</button>
          </div>
        ))}
        <button onClick={() => addKeyframe(index)}>Add Keyframe</button>
        <button onClick={() => deleteObject(index)}>Delete Object</button>
      </div>
    ));
  };

  return (
    <div className="animatorframe">
      <h3>Frame Animation Editor</h3>
      <button onClick={addObject}>Add Object</button>
      {renderObjects()}
    </div>
  );
};

export default FrameAnimation;
