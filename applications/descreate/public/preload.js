

window.addEventListener('DOMContentLoaded', () => {

	window.isElectron = true;
	window.openDevTools();

	console.log('i am preload.js')
	const replaceText = (selector, text) => {
	  const element = document.getElementById(selector);
	  if (element) element.innerText = text;
	};
  
	for (const type of ['chrome', 'node', 'electron']) {
	  replaceText(`${type}-version`, process.versions[type]);
	}
  });
  