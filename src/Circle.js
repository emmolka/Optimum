import React, { useState, useEffect } from "react";
import * as d3 from "d3";
const DetailsTop = React.memo(props => {
  const [nodes, setNodes] = useState(
    d3.range(50).map(function(d) {
      return { radius: Math.random() * 25 + 10 };
    })
  );

  var width = 400,
    height = 400;

  console.log(nodes);

  function Mati() {
    var simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(5))
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
        .select("svg")
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
        });

      u.exit().remove();
      u.enter()
        .append("text")
        .attr("r", function(d) {
          return d.radius;
        })
        .merge(u)
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      u.exit().remove();
    }
  }

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
    <div
      className="box"
      style={{
        display: "flex",
        "align-items": "center",
        "flex-direction": "column"
      }}
    >
      <div id="content">
        <svg width="400" height="400"></svg>
      </div>
      <button
        onClick={() => Mati()}
        style={{ width: 100, height: 100 }}
      ></button>
      <button
        onClick={() => {
          nodes.push({ radius: Math.random() * 25 + 10 });
          setNodes([...nodes]);
          Mati();
        }}
        style={{ width: 100, height: 100 }}
      >
        +
      </button>
      <button
        onClick={() => {
          nodes.pop();
          setNodes([...nodes]);
          Mati();
        }}
        style={{ width: 100, height: 100 }}
      >
        -
      </button>
    </div>
  );
});

export default DetailsTop;
