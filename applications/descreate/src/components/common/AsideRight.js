import React from 'react';
import Icons from '../../utils/moduels/icons'
//import handleExport from '../../utils/moduels/exportimage'

const AsideRight = ({ selectedElementKey, onElementChange, onDocumentData, dom }) => {
  if (!selectedElementKey) {
    const html = `
    <h3>File Base</h3>
    <table>
    <tr>
      <td>ID:</td>
      <td>${onDocumentData.id}</td>
    </tr>
    <tr>
      <td>File Name:</td>
    <td>${onDocumentData.name}</td>
    </tr>
    <tr>
      <td>Create Date:</td>
    <td>${onDocumentData.created}</td>
    </tr>
   </table>
    <h3>File Setting</h3>
    <table>
    <tr>
    <td>Color</td>
    <td></td>
    </tr>
    </table>
 
    `;
    return (
      <aside className="menu asideright" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

  // const divRef = useRef(null);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedElement = {
      ...selectedElementKey,
      style: {
        ...selectedElementKey.style,
        [name]: value,
      },
    };
    console.log(updatedElement);
  
  
    // 通知父组件元素发生变化
    onElementChange(updatedElement);
  };

  return (
    <aside className="menu asideright" >
      <h3>Base</h3>
      <table>
        <tr>
          <td>ID:</td>
          <td>{selectedElementKey.id}</td>
        </tr>
        <tr>
          <td>UUID:</td><td>{selectedElementKey.uuid}</td>
        </tr>
        <tr>
          <td>Type:</td><td>{selectedElementKey.type}</td>
        </tr>
      </table>
      <hr></hr>
      <h3>Selected Element Details</h3>
      <table>
      <tr>
          <td>X</td>
          <td>
            <input
              name="left"
              type="number"
              className="inputnone"
              value={selectedElementKey.style.left}
              onChange={handleInputChange}
            />
          </td>
          <td>Y</td>
          <td>
            <input
              name="top"
              type="number"
              className="inputnone"
              value={selectedElementKey.style.top}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Width</td>
          <td>
            <input
              name="width"
              type="number"
              className="inputnone"
              value={selectedElementKey.style.width}
              onChange={handleInputChange}
            />
          </td>
          <td>Hieght</td>
          <td>
            <input
              name="height"
              type="number"
              className="inputnone"
              value={selectedElementKey.style.height}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Rotate</td>
          <td>
            <input
              name="rotate"
              type="number"
              className="inputnone"
              value={selectedElementKey.style.rotate}
              onChange={handleInputChange}
            />
          </td>
          <td>Radius</td>
          <td>
            <input
              name="borderRadius"
              type="number"
              className="inputnone"
              value={selectedElementKey.style.borderRadius}
              onChange={handleInputChange}
            />
          </td>
        </tr>
      </table>
      <hr></hr>
 <h3>Background</h3>
      <table>
        <tr>
          <td>Color</td>
          <td style={{display:"flex",}}>
            {" "}
            <input
              name="backgroundColor"
              type="color"
              className="inputnone inputcolor"
              value={selectedElementKey.style.backgroundColor}
              onChange={handleInputChange}
            />
            <input value={selectedElementKey.style.backgroundColor}
              type="string"
              className="inputnone"
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Image</td>
          <td>
            <input
              name="backgroundImage"
              className="inputnone"
              value={selectedElementKey.style.backgroundImage}
              onChange={handleInputChange}
            />
          </td>
        </tr>
      </table>
      <hr></hr>
      <h3>Filter</h3>
      <div className='tag'>
        <s>{selectedElementKey.class}<span className='ireverse'><Icons name="exit" /></span> </s>
      </div>
      <hr></hr>
      <h3>Export</h3>
      <table>

  <tr>
    <td onClick={() => window.$keeBone.handleExport(selectedElementKey.uuid, 'png')}>PNG</td>
  </tr>
  <tr>
    <td onClick={() =>window.$keeBone.handleExport(selectedElementKey.uuid, 'jpg')}>JPG</td>
  </tr>
  <tr>
    <td onClick={() => window.$keeBone.handleExport(selectedElementKey.uuid, 'svg')}>SVG</td>
  </tr>
</table>

      {/* <div>
        <h3>Frame Animation</h3>
        <div>
          <h6>Frames / S</h6>
          <input></input>
        </div>
        <div>
          <h6>Duration / S</h6>
          <input></input>
        </div>
        <div>
          <h6>Animation Model</h6>
          <span>Left Way</span>
          <span>Right Way</span>
          <span>Round Trip</span>
        </div>

        <div>
          <h3>Effects</h3>
          <ul>
            <li>Backdrop Blur</li>
            blur(): 将元素的背景模糊化。
brightness(): 调整元素的背景亮度。
contrast(): 调整元素的背景对比度。
drop-shadow(): 为元素的背景添加阴影。
grayscale(): 将元素的背景转换为灰度。
hue-rotate(): 旋转元素的背景色相。
invert(): 反转元素的背景色。
opacity(): 调整元素的背景透明度。
saturate(): 调整元素的背景饱和度。
sepia(): 将元素的背景转换为深褐色。
            <li>Blur</li>
            <li>Shadow</li>
            <li>Inset Shadow</li>
          </ul>
        </div>
      </div> */}
    </aside>
  );
};

export default AsideRight;
