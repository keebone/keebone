// // Ruler.js
// export const drawRuler = (canvas, width, height, ctx, isHorizontal, startLen = 60, padding = 2, unit = 10) => {
// 	const scaleCount = Math.ceil((isHorizontal ? width : height) + startLen / unit);

// 	canvas.width = isHorizontal ? width + startLen : height;
// 	canvas.height = isHorizontal ? height : width + startLen;
// 	ctx.clearRect(0, 0, isHorizontal ? width : height, isHorizontal ? height : width + startLen);
// 	ctx.beginPath();
// 	ctx.strokeStyle = 'rgb(0, 0, 0)';
// 	ctx.font = '10px Arial';
// 	ctx.lineWidth = 1;
// 	ctx.moveTo(isHorizontal ? startLen : 0, isHorizontal ? 0 : startLen);
// 	ctx.lineTo(isHorizontal ? startLen : height, isHorizontal ? height : startLen);
// 	ctx.fillText('0', isHorizontal ? startLen + padding : padding, isHorizontal ? 13 : startLen - padding);

// 	for (let i = 1; i <= scaleCount; i++) {
// 	  const step = startLen + Math.round(i * unit);
// 	  if (i % 10 === 0) {
// 		ctx.moveTo(isHorizontal ? step : 0, isHorizontal ? 0 : step);
// 		ctx.lineTo(isHorizontal ? step : height, isHorizontal ? height : step);
// 		const scaleText = unit * i + '';
// 		ctx.fillText(scaleText, isHorizontal ? step + padding : padding, isHorizontal ? 13 : step - padding);
// 	  } else if (i % 5 === 0) {
// 		ctx.moveTo(isHorizontal ? step : 15, isHorizontal ? 15 : step);
// 		ctx.lineTo(isHorizontal ? step : height, isHorizontal ? height : step);
// 		const scaleText = unit * i + '';
// 		ctx.fillText(scaleText, isHorizontal ? step + padding : padding, isHorizontal ? 13 : step - padding);
// 	  } else {
// 		ctx.moveTo(isHorizontal ? step : height - 3, isHorizontal ? height - 3 : step);
// 		ctx.lineTo(isHorizontal ? step : height, isHorizontal ? height : step);
// 	  }
// 	}
// 	ctx.stroke();
//   };

// Ruler.js
// export const drawRuler = (canvas, width, height, ctx, padding = 2, unit = 50) => {
// 	const scaleCountHorizontal = Math.ceil(width / unit);
// 	const scaleCountVertical = Math.ceil(height / unit);

// 	canvas.width = width;
// 	canvas.height = height;
// 	ctx.clearRect(0, 0, width, height);
// 	ctx.beginPath();
// 	ctx.strokeStyle = 'rgb(0, 0, 0)';
// 	ctx.font = '10px Arial';
// 	ctx.lineWidth = 1;

// 	// 绘制水平方向的刻度
// 	ctx.moveTo(0, padding);
// 	ctx.lineTo(width, padding);
// 	ctx.fillText('0', padding, 13);
// 	for (let i = 1; i <= scaleCountHorizontal; i++) {
// 	  const step = Math.round(i * unit);
// 	  ctx.moveTo(step, padding);
// 	  ctx.lineTo(step, padding - 5);
// 	  ctx.fillText(unit * i + '', step - padding, 13);
// 	}

// 	// 绘制垂直方向的刻度
// 	ctx.moveTo(padding, 0);
// 	ctx.lineTo(padding, height);
// 	ctx.fillText('0', 0, padding + 10);
// 	for (let i = 1; i <= scaleCountVertical; i++) {
// 	  const step = Math.round(i * unit);
// 	  ctx.moveTo(padding, step);
// 	  ctx.lineTo(padding - 5, step);
// 	  ctx.fillText(unit * i + '', 0, step + padding + 10); //这个文字应该做一个旋转向上旋转90deg
// 	}

// 	ctx.stroke();
//   };

// Ruler.js// Ruler.js// Ruler.js
//  const drawRuler = (canvas, width, height, ctx, padding = 2, unit = 100) => {
// 	const scaleCountHorizontal = Math.ceil(width / unit);
// 	const scaleCountVertical = Math.ceil(height / unit);

// 	canvas.width = width;
// 	canvas.height = height;
// 	ctx.clearRect(0, 0, width, height);
// 	ctx.beginPath();
// 	ctx.strokeStyle = 'rgb(0, 0, 0)';
// 	ctx.font = '10px Arial';
// 	ctx.lineWidth = 1;

// 	// 绘制水平方向的刻度
// 	ctx.moveTo(0, padding);
// 	ctx.lineTo(width, padding);
// 	ctx.fillText('0', padding, 13);
// 	for (let i = 1; i <= scaleCountHorizontal; i++) {
// 	  const step = Math.round(i * unit);
// 	  ctx.moveTo(step, padding);
// 	  ctx.lineTo(step, padding - 5);
// 	  ctx.fillText(unit * i + '', step - padding, 13);
// 	}

// 	// 绘制垂直方向的刻度
// 	ctx.moveTo(padding, 0);
// 	ctx.lineTo(padding, height);
// 	ctx.fillText('0', 0, padding + 10);
// 	for (let i = 1; i <= scaleCountVertical; i++) {
// 	  const step = Math.round(i * unit);
// 	  ctx.moveTo(padding, step);
// 	  ctx.lineTo(padding - 5, step);
// 	  ctx.save(); // 保存当前绘图状态
// 	  ctx.translate(padding + 10, step); // 将坐标系移到文字位置
// 	  ctx.rotate(-Math.PI / 2); // 旋转文字
// 	  ctx.fillText(unit * i + '', 0, 0); // 绘制文字
// 	  ctx.restore(); // 恢复之前的绘图状态
// 	}

// 	ctx.stroke();
//   };

const drawRuler = (canvas, width, height, ctx) => {
	const padding = 2;
	const unit = 100;
	const startLen=10;//开始间隔
	 //计算出要绘制多少个刻度
	 const scaleCount = Math.ceil(width + startLen / unit);
  const scaleCountHorizontal = Math.ceil(width / unit);
  const scaleCountVertical = Math.ceil(height / unit);

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.font = "10px Arial";
  ctx.lineWidth = 1;
  ctx.moveTo(startLen, 0);
  ctx.lineTo(startLen, height);
  ctx.fillText("0", startLen + startLen, 13);

  for (let i = 1; i <= scaleCountHorizontal; i++) {
    //计算每个刻度的位置
    const step = startLen + Math.round(i * unit);
    //10的倍数刻度大长度
    if (i % 10 === 0) {
      ctx.moveTo(step, 0);
      ctx.lineTo(step, startLen);
      //标注刻度值
      const scaleText = i * unit + "";
      ctx.fillText(scaleText, step + startLen, 13);
    } else if (i % 5 === 0) {
      //5的倍数刻度中长度
      ctx.moveTo(step, 15);
      ctx.lineTo(step, startLen);
      //标注刻度值
      const scaleText = i * unit + "";
      ctx.fillText(scaleText, step + startLen, 13);
    } else {
      //其他刻度小长度
      ctx.moveTo(step, startLen - 3);
      ctx.lineTo(step, startLen);
    }
  }


//   canvas.width = height;
//   canvas.height = width + startLen;
//   ctx.clearRect(0, 0, height, width + startLen);

//   ctx.beginPath();
//   //绘制起点
//   ctx.strokeStyle = 'rgb(0, 0, 0)';
//   ctx.font = '10px Arial';
//   ctx.lineWidth =1;
//   ctx.moveTo(0, startLen);
//   ctx.lineTo(height, startLen);
//   ctx.fillText('0', padding, startLen - padding);
 

  for (let i = 1; i <= scaleCountVertical; i++) {
   //计算每个刻度的位置
	const step = startLen + Math.round(i * unit );
	  //10的倍数刻度大长度
	if (i % 10 === 0) {
	  ctx.moveTo(0, step);
	  ctx.lineTo(startLen, step);
	  //标注刻度值
	  const scaleText = unit * i + '';
	  ctx.fillText(scaleText, padding, step - padding);
	} else if (i % 5 === 0) {//5的倍数刻度中长度
	  ctx.moveTo(15, step);
	  ctx.lineTo(startLen, step);
	  //标注刻度值
	  const scaleText = unit * i + '';
	  ctx.fillText(scaleText, padding, step - padding);
	} else {//其他刻度小长度
	  ctx.moveTo(startLen - 3, step);
	  ctx.lineTo(startLen, step);
	}
  }

  ctx.stroke();
};
export default drawRuler;
