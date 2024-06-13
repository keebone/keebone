import React, { useState } from "react";
import { Converter } from "opencc-js";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Icons from "../utils/moduels/icons";
import { useTranslation } from 'react-i18next';
const Convert = () => {
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const { t } = useTranslation();
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
      console.error("Failed to read clipboard:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="convert">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <div style={{ flex: 1, padding: "2rem" }}>
            <div className="languagetype">
              <div className="languagetypeitem">
                <span>English</span>
                <span>Chinese / Simplified</span>
                <span>Chinese / Traditional</span>
                <span>Japanese</span>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button onClick={handleCopy}>{t("copy")}</button>
                <button onClick={handlePaste}>{t('paste')}</button>
              </div>
                <pre  className="textarea">{convertedText}</pre>
            </div>
          </div>
          <div style={{ flex: 1, padding: "2rem" }}>
            <div className="languagetype">
              <div className="languagetypeitem">
                <span>Chinese</span>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button onClick={handlePaste}>{t('paste')}</button>
                <button onClick={handleConvert}>{t('change')}</button>
              </div>
              <textarea
                className="textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="输入简体中文"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Convert;
