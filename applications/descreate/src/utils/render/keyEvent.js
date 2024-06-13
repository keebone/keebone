const onKeyAction = (e: KeyboardEvent) => {
	//按空格键切换显隐操作操作蒙版
			if (e.keyCode == keyCode.space) {
			  editorStore.setMoveCanvas(!editorStore.isMoveCanvas);
			}
		  };
		  //滚轮缩放画布
		  const onWheelAction = (e: WheelEvent) => {
			if (isMoveCanvas.value) {
			  if (e.wheelDelta > 0) {
				editorStore.setScale(editorStore.scale + 1);
			  } else {
				editorStore.setScale(editorStore.scale - 1);
			  }
			}
		  };
		  //注册监听动作
		  onMounted(() => {
			window.addEventListener('keydown', onKeyAction);
			window.addEventListener('wheel', onWheelAction);
			refreshRuler();
		  });
		  //取消监听动作
		  onBeforeUnmount(() => {
			window.removeEventListener('keydown', onKeyAction);
			window.removeEventListener('wheel', onWheelAction);
		  });