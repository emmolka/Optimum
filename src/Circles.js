import React, { useState } from "react";
import * as d3 from "d3";
import "./App.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
const Circles = React.memo(props => {
  const [nodes, setNodes] = useState(
    d3.range(5).map(function(d) {
      return { radius: Math.random() * 10 + 40 };
    })
  );
  const [gravity, setGravity] = useState("5");
  const [showSign, setShowSign] = useState(true);
  console.log(
    d3.range(5).map(function(d) {
      return { radius: Math.random() * 10 + 40 };
    }),
    nodes
  );
  const width = 400;
  const height = 500;
  //removes last
  function remove() {
    svg.remove();
  }
  // adds the svg element
  const svg = d3
    .select(".svg")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // drawing the circles

  const drawCircles = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", function(d) {
      return d.radius;
    })
    .style("fill", "#69a2b2");

  // drawing the text
  const drawText = svg
    .append("g")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
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
    .force("charge", d3.forceManyBody().strength(gravity))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collision",
      d3.forceCollide().radius(function(d) {
        return d.radius;
      })
    );
  //forces for the text
  const simulationText = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(gravity))
    .force("center", d3.forceCenter(width / 2, height / 2))
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

  return (
    <div className="box">
      <div className="wrapper">
        <IoIosAdd
          className="icon"
          onClick={() => {
            nodes.push({ radius: Math.random() * 10 + 40 });
            setNodes([...nodes]);
            setShowSign(false);
            remove();
          }}
        ></IoIosAdd>
        <IoIosRemove
          className="icon"
          onClick={() => {
            nodes.pop();
            setNodes([...nodes]);
            remove();
            setShowSign(false);
            // draw();
          }}
        ></IoIosRemove>
      </div>
      <div className="wrapper ">
        <div className="show-sign">
          {showSign ? <p>Click any button to start</p> : <div></div>}
        </div>
        <svg className="svg"></svg>
      </div>
      <div className="wrapper">
        <p className="gravity-sign">Gravity</p>
        <input
          type="range"
          min="-100"
          max="100"
          value={gravity}
          onChange={event => {
            setGravity(event.target.value);
            remove();
            setShowSign(false);
          }}
        ></input>
      </div>
    </div>
  );
});

export default Circles;
