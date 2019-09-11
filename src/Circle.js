import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
const DetailsTop = React.memo(props => {
  const [nodes, setNodes] = useState(
    d3.range(5).map(function(d) {
      return { radius: Math.random() * 25 + 10 };
    })
  );
  const [gravity, setGravity] = useState("5");

  var width = 400,
    height = 400;

  function draw() {
    var simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(gravity))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius(function(d) {
          return d.radius;
        })
      )
      .on("tick", ticked);

    function ticked() {
      var u = d3
        .select(".svg")
        .selectAll("circle")
        .data(nodes);

      u.enter()
        .append("circle")
        .attr("r", function(d) {
          return d.radius;
        })
        .merge(u)
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        })
        .attr("fill", "white");

      u.exit().remove();
    }
  }
  draw();

  // const simulation = d3
  //   .forceSimulation(circles)
  //   .force("charge", d3.forceManyBody().strength(5))
  //   .force("center", d3.forceCenter(50 / 2, 50 / 2))
  //   .force(
  //     "collision",
  //     d3.forceCollide().radius(function(d) {
  //       return d.radius;
  //     })
  //   );
  // }
  // const circles = [];

  return (
    <div className="box">
      <div className="wrapper">
        <IoIosAdd
          className="icon"
          onClick={() => {
            nodes.push({ radius: Math.random() * 25 + 10 });
            setNodes([...nodes]);
            draw();
          }}
        ></IoIosAdd>
        <IoIosRemove
          className="icon"
          onClick={() => {
            nodes.pop();
            setNodes([...nodes]);
            draw();
          }}
        ></IoIosRemove>
      </div>
      <div className="wrapper ">
        <svg className="svg"></svg>
      </div>
      <div className="wrapper">
        <input
          type="range"
          min="-20"
          max="20"
          value={gravity}
          onChange={event => {
            setGravity(event.target.value);
            draw();
          }}
        ></input>
      </div>
    </div>
  );
});

export default DetailsTop;
