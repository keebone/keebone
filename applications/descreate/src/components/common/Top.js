import React from 'react';
import Icons from "../../utils/moduels/icons";
function Top({file}) {
  return (
      <u>
		  {/* <div id="title-bar">
            <button  id="close-button" onClick={() => window.api.send('close-window')}>关闭</button>

    <button className="dragwindow" id="minimize-button">最小化</button>
    <button  className="dragwindow" id="maximize-restore-button">最大化</button>
    Custom Title Bar
  </div> */}
        <ul className="windowcontral">
          <li style={{paddingLeft:'5rem'}}></li>
          <li className="dragwindow">
            <span className="imini">
              <Icons name="drag" />
            </span>
          </li>
          <li>
            {" "}
            <a href="/create">
              <span className="imini">
                <Icons name="home" />
              </span>
            </a>{" "}
          </li>
          <li className="activetab">
            {" "}
            <a href="/create">
              <span className="imini">
                <Icons name="file" />
              </span>{" "}
            </a>{" "}
            {file.name} 
            {/* <Icons name="exit" /> */}
          </li>
          <li>
            {" "}
            <a href="/create">
              {" "}
              <Icons name="add" />
            </a>
          </li>
        </ul>
        <ul style={{ width: "100%" }}>
          <li style={{ width: "100%" }} className="dragwindow"></li>
        </ul>
      </u>
  );
}

export default Top;
