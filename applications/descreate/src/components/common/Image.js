import React, { useRef, useEffect } from 'react';

const ImageComponent = ({ base64Data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width; // 设置画布的宽度为图像的宽度
      canvas.height = image.height; // 设置画布的高度为图像的高度
      context.drawImage(image, 0, 0); // 在画布上绘制图像
    };

    image.src = base64Data;
  }, [base64Data]);

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />;
};

export default ImageComponent;
