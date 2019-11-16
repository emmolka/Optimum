import React from "react";
import Circles from "./Circles";
import svg2pdf from "svg2pdf.js";
import jsPDF from "jspdf-yworks";
// import useWindowSize from "./getWindowSize";

function App() {
  const windowSize = { height: window.innerWidth, width: window.innerHeight };
  console.log(window.innerWidth);
  const test = () => {
    const svgElement = document.getElementById("svg");
    if (windowSize.width > 1000) {
      windowSize.width = 1000;
    }
    if (windowSize.height > 1000) {
      windowSize.height = 700;
    }
    // create a new jsPDF instance
    const pdf = new jsPDF("l", "pt", [windowSize.width, windowSize.height]);

    // render the svg element
    svg2pdf(svgElement, pdf, {
      xOffset: 0,
      yOffset: 0,
      scale: 1
    });

    // get the data URI
    const uri = pdf.output("datauristring");

    // or simply save the created pdf
    pdf.save("myPDF.pdf");
  };
  return (
    <div className="App">
      <Circles click={() => test()}></Circles>
    </div>
  );
}

export default App;
