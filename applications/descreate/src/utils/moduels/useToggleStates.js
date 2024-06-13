// useToggleStates.js
import React, { useState } from 'react';
const useToggleStates = () => {
  const [showMenuList, setShowMenuList] = useState(false); // 新增状态来控制菜单列表的显示与隐藏
  const [showLeftAside, setShowLeftAside] = useState(false); //左侧
  const [showRightAside, setShowRightAside] = useState(true); //右侧
  const [showAnimator, setShowAnimator] = useState(false); //下侧 动画
  const [showImportImage, setShowImportImage] = useState(false); //下侧 动画


  const toggleLeftAside = () => { setShowLeftAside(!showLeftAside); };

  const toggleRightAside = () => { setShowRightAside(!showRightAside); };

  const toggleMenuList = () => { setShowMenuList(!showMenuList); };

  const toggleAnimator = () => { setShowAnimator(!showAnimator); };

  const toggleImportImage = () => { setShowImportImage(!showImportImage); };

  return {
    showLeftAside,
    toggleLeftAside,
    showRightAside,
    toggleRightAside,
    showMenuList,
    toggleMenuList,
    showAnimator,
    toggleAnimator,
    showImportImage ,
    toggleImportImage
  };
};

export default useToggleStates;
