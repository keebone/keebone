import React, { useState } from "react";
import { Converter } from "opencc-js";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Icons from "../utils/moduels/icons";

const Dimension = () => {
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");

  const handleConvert = async () => {
    const converter = await Converter({ from: "cn", to: "tw" });
    const result = converter(inputText);
    setConvertedText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    alert("繁体中文内容已复制到剪贴板");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setInputText(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };


  return (
    <div>
      <Header />
      <div className="convert">
     
        <div style={{ display: "flex", justifyContent: "space-between", height:'100%',width:'100%' }}>
          <div style={{ flex: 1, padding: "2rem" }}>
            <h3>转换后的繁体中文</h3>
            <span className="ireverse" onClick={handleCopy}>
              <Icons name="copy" />
            </span>
            <pre>{convertedText}</pre>
          </div>
          <div style={{ flex: 1, padding: "2rem" }}>
            <h3>简体到繁体转换</h3>
            <span className="ireverse" onClick={handlePaste}>
              <Icons name="paete" />
            </span>
            <textarea
              style={{ height:"60%", width: "100%" }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入简体中文"
            />
		   <button onClick={handleConvert}>转换</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dimension;
