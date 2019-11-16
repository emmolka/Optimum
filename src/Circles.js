import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
// import useWindowSize from "./getWindowSize";
const Circles = React.memo(props => {
  const [nodes, setNodes] = useState(
    d3.range(5).map(function(d) {
      return {
        radius: Math.random() * 10 + 40,
        x: Math.random() * 90 + 300,
        y: Math.random() * 90 + 200
      };
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

  // adds the svg element
  const svg = d3
    .select(".svg")
    .attr("width", width)
    .attr("height", height);
  svg.call(
    d3.zoom().on("zoom", function() {
      d3.select("g").attr("transform", d3.event.transform);
    })
  );

  // const draw = svg.selectAll("g");

  //forces for the circles
  const simulationCircles = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(gravity))
    // .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collision",
      d3.forceCollide().radius(function(d) {
        return d.radius;
      })
    );
  // //forces for the text
  // const simulationText = d3
  //   .forceSimulation(nodes)
  //   .force("charge", d3.forceManyBody().strength(gravity))
  //   .force("center", d3.forceCenter(width / 5, height / 5))
  //   .force(
  //     "collision",
  //     d3.forceCollide().radius(function(d) {
  //       return d.radius;
  //     })
  //   );
  // //  simulation for the circles
  simulationCircles.nodes(nodes).on("tick", function(d) {
    d3.selectAll("circle")
      .data(nodes)
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
    d3.selectAll("text")
      .data(nodes)
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      });
    // console.log(d);
    // d3.selectAll("circle")
    //   .attr("cx", function(d) {
    //     return d.x;
    //   })
    //   .attr("cy", function(d) {
    //     return d.y;
    //   });
  });
  // //simulation for the text
  // simulationText.nodes(nodes).on("tick", function(d) {
  //   drawText
  //     .attr("x", function(d) {
  //       return d.x;
  //     })
  //     .attr("y", function(d) {
  //       return d.y;
  //     });
  // });
  // });
  return (
    <div className="box">
      <div className="wrapper">
        <IoIosAdd
          className="icon"
          onClick={() => {
            nodes.push({
              radius: Math.random() * 10 + 40,
              x: Math.random() * 90 + 100,
              y: Math.random() * 90 + 100
            });
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
        <button className="download-button" onClick={props.click}>
          Download pdf
        </button>
      </div>
      <div className="wrapper ">
        <div className="show-sign">
          {showSign ? <p>Click any button to start</p> : null}
        </div>
        <svg className="svg" id="svg">
          {showSign ? null : (
            <g>
              {nodes.map(el => (
                <g>
                  <circle
                    r={el.radius}
                    cx={el.x}
                    cy={el.y}
                    fill="#69a2b2"
                  ></circle>
                  <text
                    x={el.x}
                    y={el.y}
                    fontSize={el.radius * 0.3}
                    textAnchor="middle"
                  >
                    Lorem ipsum
                  </text>
                </g>
              ))}
            </g>
          )}
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
            setShowSign(false);
          }}
        ></input>
      </div>
    </div>
  );
});

export default Circles;
