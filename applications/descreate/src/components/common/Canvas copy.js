import React, { useState, useEffect, useRef } from "react";

const Canvas = ({ datas,onDataClick }) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
// 	const ctx = canvas.getContext('2d');

	  //根据父级变化尺寸
    // const updateCanvasSize = () => {
    //   const parentWidth = canvas.parentNode.offsetWidth;
    //   const parentHeight = canvas.parentNode.offsetHeight;
    //   setCanvasWidth(parentWidth);
    //   setCanvasHeight(parentHeight);
	setCanvasWidth(15000);
      setCanvasHeight(15000);
    // };

    // // 初始设置一次
    // updateCanvasSize();

    // // 监听窗口大小变化，或者其他导致父级元素大小变化的事件
    // window.addEventListener("resize", updateCanvasSize);



    // 清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制长的尺寸标
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, 0);
    context.font = '12px Arial';
    context.fillText(`${canvasWidth}px`, canvas.width - 30, -5); // 在右上角绘制文字

    // 绘制宽的尺寸标
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, canvas.height);
    context.fillText(`${canvasHeight}px`, 5, canvas.height - 5); // 在左下角绘制文字

    // 绘制箭头
    context.beginPath();
    context.moveTo(canvas.width - 10, 5);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width - 10, -5);
    context.moveTo(5, canvas.height - 10);
    context.lineTo(0, canvas.height);
    context.lineTo(-5, canvas.height - 10);
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.stroke();

	const drawElements = () => {
		context.clearRect(0, 0, canvas.width, canvas.height);
		datas.forEach((data) => {
		  // 设置背景颜色
		  context.fillStyle = data.style.backgroundColor || "transparent";
		  // 绘制方块
		  context.fillRect(data.style.left, data.style.top, data.style.width, data.style.height);
		  // 设置颜色
		  context.fillStyle = data.color || "black";
		  // 绘制内部内容
		  // context.fillText("Text", x, y); 如果需要在方块内部绘制文字
		});
	  };
	  


    drawElements();


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
  }, [datas,canvasWidth, canvasHeight]);

  window.addEventListener('resize', drawElements());
  const handleCanvasLoad = () => {
    const canvas = canvasRef.current;
    setCanvasWidth(canvas.offsetWidth);
    setCanvasHeight(canvas.offsetHeight);
  };


  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ width: `${width}px`, height: `${height}px`}} />;
};

export default Canvas;
