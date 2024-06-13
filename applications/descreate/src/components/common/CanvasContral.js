import React, { useState } from "react";
import Frame from "./Frame"; // 调整路径以确保正确引用 Frame 组件
// import Icons from "../components/common/Icons";
// import AsideRight from "../components/common/AsideRight";
// import AsideLeft from "../components/common/AsideLeft";
import AnimatorFrame from "./AnimatorFrame";

const CanvasContral = ({ eles, onElementSelect, showAnimator }) => {
  const handleSelectElement = (element) => {
    onElementSelect(element);
  };


  const generateCSSFromStyle = (style) => {
    const css = {};
  
    for (const key in style) {
      if (Object.hasOwnProperty.call(style, key)) {
        const value = style[key];
  
        switch (key) {
          case 'width':
          case 'height':
            css[key] = `${value}px`;
            break;
          case 'borderRadius':
            css.borderRadius = `${value}px`;
            break;
          case 'rotate':
            css.transform = `rotate(${value}deg)`;
            break;
          case 'backgroundImage':
            css.backgroundImage = `url('${value}')`;
            break;
          case 'backgroundColor':
            css.backgroundColor = value;
            break;
          default:
            // If the property name does not match any of the above cases, do not process it
            css[key] = value;
            break;
        }
      }
    }
  
    return css;
  };
  
  

  return (
    <div className="canvascontral">
      <div className="canvaszone">
        <div className="createcenter">
          <div style={{ width: "6000px", height: "6000px", background: "transparent", }} >
            {eles.map((eles) => (
              <div
                onClick={() => handleSelectElement(eles)}
                id={eles.uuid}
                className={`element ${eles.class}`}
                data-foo={eles.type + " " + eles.uuid}
                key={eles.uuid}
                style={generateCSSFromStyle(eles.style)}
              ></div>

            ))}
          </div>
        </div>
        {showAnimator && <AnimatorFrame />}
      </div>
    </div>
  );
};

export default CanvasContral;