import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
// import useWindowSize from "./getWindowSize";
const Circles = React.memo(props => {
  const [nodes, setNodes] = useState(
    d3.range(5).map(function(d) {
      return { radius: Math.random() * 10 + 40, x: 100, y: 100 };
    })
  );
  const [gravity, setGravity] = useState("5");
  const [windowSize, setWindowsize] = useState({
    height: window.innerWidth,
    width: window.innerHeight
  });
  const [showSign, setShowSign] = useState(true);

  const width = windowSize.width;
  const height = windowSize.height;
  //removes last

  // adds the svg element
  // useEffect(() => {
  const svg = d3
    .select(".svg")

    .attr("width", width)
    .attr("height", height);

  // drawing the circles

  const drawCircles = svg
    // .append("g")
    .selectAll("circle")
    .data(nodes)
    // .enter()
    // .append("circle")
    .attr("r", function(d) {
      return d.radius;
    })
    .style("fill", "#69a2b2");

  svg.call(
    d3.zoom().on("zoom", function() {
      d3.select("g").attr("transform", d3.event.transform);
    })
  );
  // drawing the text
  const drawText = svg
    // .append("g")
    .selectAll("text")
    .data(nodes)
    // .enter()
    // .append("text")
    .attr("text-anchor", "middle")
    .text("Lorem ipsum")
    .attr("font-size", function(d) {
      return d.radius * 0.3;
    })
    // .attr("r", 25)
    .style("fill", "#eee");

  //forces for the circles
  const simulationCircles = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(gravity));
  // .force("center", d3.forceCenter(width / 2, height / 2))
  // .force(
  //   "collision",
  //   d3.forceCollide().radius(function(d) {
  //     return d.radius;
  //   })
  // );
  //forces for the text
  const simulationText = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(gravity))
    .force("center", d3.forceCenter(width / 5, height / 5))
    .force(
      "collision",
      d3.forceCollide().radius(function(d) {
        return d.radius;
      })
    );
  //  simulation for the circles
  simulationCircles.nodes(nodes).on("tick", function(d) {
    drawCircles
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  });
  //simulation for the text
  simulationText.nodes(nodes).on("tick", function(d) {
    drawText
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      });
  });
  // });
  return (
    <div className="box">
      <div className="wrapper">
        <IoIosAdd
          className="icon"
          onClick={() => {
            nodes.push({ radius: Math.random() * 10 + 40 });
            setNodes([...nodes]);
            setShowSign(false);
          }}
        ></IoIosAdd>
        <IoIosRemove
          className="icon"
          onClick={() => {
            nodes.pop();
            setNodes([...nodes]);

            setShowSign(false);
            // draw();
          }}
        ></IoIosRemove>
      </div>
      <div className="wrapper">
        <button
          className="download-button"
          onClick={showSign ? null : props.click}
        >
          Download pdf
        </button>
      </div>
      <div className="wrapper ">
        <div className="show-sign">
          {showSign ? <p>Click any button to start</p> : <div></div>}
        </div>
        <svg className="svg" id="svg">
          <g>
            {nodes.map(el => (
              <g>
                <circle></circle>
                <text></text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="wrapper">
        <p className="gravity-sign">Gravity</p>
        <input
          type="range"
          min="-200"
          max="50"
          value={gravity}
          onChange={event => {
            setGravity(event.target.value);

            // setShowSign(false);
          }}
        ></input>
      </div>
    </div>
  );
});

export default Circles;
