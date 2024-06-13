// const generateMicrosecondUUID = () => {
// 	const now = Date.now(); // 获取当前时间戳（毫秒）
// 	const performanceNow = performance.now(); // 获取高精度时间戳（毫秒）
  
// 	const microseconds = Math.floor((performanceNow % 1) * 1e6); // 提取微秒部分
  
// 	const currentDate = new Date(now);
  
// 	const year = currentDate.getFullYear();
// 	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
// 	const day = String(currentDate.getDate()).padStart(2, '0');
  
// 	const hours = String(currentDate.getHours()).padStart(2, '0');
// 	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
// 	const seconds = String(currentDate.getSeconds()).padStart(2, '0');
// 	const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
  
// 	// 根据微秒部分是否为零，决定是否添加到 UUID 字符串中
// 	const microsecondsStr = microseconds === 0 ? '' : String(microseconds).padStart(6, '0');
  
// 	// 将日期、时间、毫秒和微秒部分组合成一个字符串，作为唯一标识符
// 	const uuid = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${microsecondsStr}`;
  
// 	return uuid;
//   };
  
//   export default generateMicrosecondUUID;

const generate = {
	uuid: () => {
	  const now = Date.now(); // 获取当前时间戳（毫秒）
	  const performanceNow = performance.now(); // 获取高精度时间戳（毫秒）
  
	  const microseconds = Math.floor((performanceNow % 1) * 1e6); // 提取微秒部分
  
	  const currentDate = new Date(now);
  
	  const year = currentDate.getFullYear();
	  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	  const day = String(currentDate.getDate()).padStart(2, '0');
  
	  const hours = String(currentDate.getHours()).padStart(2, '0');
	  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
	  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
  
	  // 将日期、时间和毫秒部分组合成一个字符串，作为唯一标识符
	  const uuid = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  
	  return uuid;
	},
	date: () => {
	  const now = Date.now(); // 获取当前时间戳（毫秒）
	  const currentDate = new Date(now);
  
	  const year = currentDate.getFullYear();
	  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	  const day = String(currentDate.getDate()).padStart(2, '0');
  
	  const hours = String(currentDate.getHours()).padStart(2, '0');
	  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
	  // 将创建日期和时间部分组合成一个字符串，作为唯一标识符
	  const creationDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
  
	  return creationDate;
	}
  };
  export default generate;
  