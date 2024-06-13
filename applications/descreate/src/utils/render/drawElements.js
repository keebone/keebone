const drawElements = (canvas,datas) => {
	//  const context = canvas.getContext("2d");

	// const width = 6000;
	// const height = 6000;

	const ctx = canvas.getContext('2d');
	const startLen = 6;
	  //屏幕大小
	const screenWidth = 2560;
	const screenHeight = 1440;
	const thumbnailSize = 0.1; //10:1的缩放比例

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	window.$keeBone.drawRuler(
	  document.getElementById("canvas"),
	  screenWidth,
	  screenHeight,
	  ctx
	);
	datas.forEach((data) => {
		ctx.fillStyle = data.style.backgroundColor || "transparent";
	    ctx.fillRect(
		data.style.left,
		data.style.top,
		data.style.width,
		data.style.height
	  );
	  ctx.fillStyle = data.color || "black";
	});


			  
		

	// //缩略图大小
	// const canvasConfig = {
	//   thumbnailWidth: Math.ceil(screenWidth * thumbnailSize),
	//   thumbnailHeight: Math.ceil(screenHeight * thumbnailSize),
	//   thumbnailWrapWidth: Math.ceil((screenWidth + 400) * thumbnailSize),
	//   thumbnailWrapHeight: Math.ceil((screenHeight + 400) * thumbnailSize)
	// };
	// //可视范围框
	// const viewBox = {
	//   viewWidth: Math.ceil(1000 * thumbnailSize),
	//   viewHeight: Math.ceil(800 * thumbnailSize)
	// };
	// //滚动坐标
	// const scroll = {
	//   scrollLeft: Math.ceil(300 * thumbnailSize),
	//   scrollTop: Math.ceil(200 * thumbnailSize)
	// };
	// //计算出要绘制多少个刻度
	// canvas.width = canvasConfig.thumbnailWrapWidth;
	// canvas.height = canvasConfig.thumbnailWrapHeight;

	// //画缩略框
	// ctx.clearRect(0, 0, canvasConfig.thumbnailWrapWidth, canvasConfig.thumbnailWrapHeight);
	// ctx.beginPath();
	// ctx.fillStyle = 'rgba(26, 103, 255, 0.5)';
	// ctx.rect(startLen, startLen, canvasConfig.thumbnailWidth, canvasConfig.thumbnailHeight);
	// ctx.fill();
	// //画可视范围框
	// ctx.beginPath();
	// ctx.strokeStyle = '#1a67ff';
	// ctx.rect(
	//   Math.round(scroll.scrollLeft),
	//   Math.round(scroll.scrollTop),
	//   viewBox.viewWidth,
	//   viewBox.viewHeight
	// );
	// ctx.stroke();



  };


  export default  drawElements ;
