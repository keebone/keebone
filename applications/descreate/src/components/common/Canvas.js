import React, { useState, useEffect, useRef } from "react";
//import { drawRuler } from "utils/moduels/ruler";

const Canvas = ({ datas, onDataClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    window.$keeBone.drawElements(canvas,datas);

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // 逆序检查方块，这样最上层的方块会先被检测到
      for (let i = datas.length - 1; i >= 0; i--) {
        const data = datas[i];
        const { left, top, width, height } = data.style;
        if (
          mouseX >= left &&
          mouseX <= left + width &&
          mouseY >= top &&
          mouseY <= top + height
        ) {
          onDataClick(data); //传给父级元素
          break; // 找到匹配的方块后停止检测
        }
      }
    };

    // 添加点击事件监听器
    canvas.addEventListener("click", handleClick);

    // 在组件卸载时移除事件监听器
    return () => {
      //   window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("click", handleClick);
    };
  }, [datas]);





  

  return <canvas id="canvas" ref={canvasRef} width="6000" height="6000" />;
};

export default Canvas;
