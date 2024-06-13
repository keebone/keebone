import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useTranslation } from "react-i18next";

const Colors = () => {
  const [color, setColor] = useState("#00A1E6");

  useEffect(() => {
    const handleColorChange = (event) => {
      const hexColor = event.target.value;
      setColor(hexColor);

      const rgbColor = hexToRgb(hexColor);
      document.getElementById("rgbInput").value = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

      const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
      document.getElementById("hslInput").value = `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;
    };

    document
      .getElementById("colorPicker")
      .addEventListener("input", handleColorChange);

    // 清理函数，移除事件监听器
    return () => {
      document
        .getElementById("colorPicker")
        .removeEventListener("input", handleColorChange);
    };
  }, []); // 空依赖数组确保只在组件挂载和卸载时执行

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
g /= 255;
b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  return (
    <div>
      <Header />
      <div className="convert">
        <input id="colorPicker" type="color" value={color} readOnly />
        <input id="rgbInput" placeholder="RGB" readOnly />
        <input id="hexInput" placeholder="HEX" value={color} readOnly />
        <input id="hslInput" placeholder="HSL" readOnly />
      </div>
      <Footer />
    </div>
  );
};

export default Colors;
