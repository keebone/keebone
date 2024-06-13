import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Canvas from "../components/common/Canvas";

function About() {
  return (
    <main>
      <Header />
      <div className="home">
       <Canvas /> 
      </div>
      <Footer />
    </main>
  );
}

export default About;
