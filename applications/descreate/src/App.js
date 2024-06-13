//import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Create from "./pages/Create";
import Canvas from "./pages/Canvas";
import Colors from "./pages/Colors";
import Translate from "./pages/Translate";
import Svg from "./pages/Svg";


function App() {

  return (
    <div className="light">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/colors" element={<Colors />} />
          {/* <Route exact path="/Dimension" element={<Dimension />} /> */}
          <Route exact path="/translate" element={<Translate />} />
          <Route exact path="/canvas/:id" element={<Canvas />} />
          <Route exact path="/svg" element={<Svg />} />
        </Routes>
    </div>
  );
}

export default App;
