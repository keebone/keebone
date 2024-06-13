// handleExport.js
import domtoimage from 'dom-to-image';

const handleExport = (id, type) => {
  const ele = document.getElementById(id)
  if (ele) {
    let exportFunction;
    let fileExtension;

    switch (type) {
      case 'png':
        exportFunction = domtoimage.toPng;
        fileExtension = 'png';
        break;
      case 'jpg':
        exportFunction = (element) => domtoimage.toJpeg(element, { quality: 0.95 });
        fileExtension = 'jpg';
        break;
      case 'svg':
        exportFunction = domtoimage.toSvg;
        fileExtension = 'svg';
        break;
      default:
        console.error('Unsupported export type:', type);
        return;
    }

    exportFunction(ele)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${id}.${fileExtension}`;
        link.click();
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error);
      });
  }
};

export default  handleExport ;
