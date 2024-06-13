import React, { useState, useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // 检查点击的位置是否在方块内，并移除被点击的方块
      setSquares(prevSquares => prevSquares.filter(square => {
        return !(mouseX >= square.x && mouseX <= square.x + square.size &&
          mouseY >= square.y && mouseY <= square.y + square.size);
      }));
    };

    // 添加点击事件监听器
    canvas.addEventListener('click', handleClick);

    // 在组件卸载时移除事件监听器
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  // 添加新方块
  const addSquare = () => {
    const newSquare = {
      id: squares.length + 1,
      x: Math.random() * 400,
      y: Math.random() * 400,
      size: 50,
      color: getRandomColor()
    };
    setSquares(prevSquares => [...prevSquares, newSquare]);
  };

  // 生成随机颜色
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // 绘制方块
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    squares.forEach(square => {
      context.fillStyle = square.color;
      context.fillRect(square.x, square.y, square.size, square.size);
    });
  }, [squares]);

  return (
    <div>
      <button onClick={addSquare}>Add Square</button>
      <canvas ref={canvasRef} width="400" height="400" style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Canvas;
