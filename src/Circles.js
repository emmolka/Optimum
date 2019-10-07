// import React, { useState } from "react";
// import * as d3 from "d3";
// import "./App.css";
// import { IoIosAdd, IoIosRemove } from "react-icons/io";
// const Circles = React.memo(props => {
//   const [nodes, setNodes] = useState(
//     d3.range(5).map(function(d) {
//       return { radius: Math.random() * 10 + 40 };
//     })
//   );
//   const [gravity, setGravity] = useState("5");
//   const [showSign, setShowSign] = useState(true);
//   console.log(
//     d3.range(5).map(function(d) {
//       return { radius: Math.random() * 10 + 40 };
//     }),
//     nodes
//   );
//   const width = 400;
//   const height = 500;
//   //removes last
//   function remove() {
//     svg.remove();
//   }
//   // adds the svg element
//   const svg = d3
//     .select(".svg")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

//   // drawing the circles

//   const drawCircles = svg
//     .append("g")
//     .selectAll("circle")
//     .data(nodes)
//     .enter()
//     .append("circle")
//     .attr("r", function(d) {
//       return d.radius;
//     })
//     .style("fill", "#69a2b2");

//   // drawing the text
//   const drawText = svg
//     .append("g")
//     .selectAll("text")
//     .data(nodes)
//     .enter()
//     .append("text")
//     .attr("text-anchor", "middle")
//     .text("Lorem ipsum")
//     .attr("font-size", function(d) {
//       return d.radius * 0.3;
//     })
//     // .attr("r", 25)
//     .style("fill", "#eee");

//   //forces for the circles
//   const simulationCircles = d3
//     .forceSimulation(nodes)
//     .force("charge", d3.forceManyBody().strength(gravity));
//   // .force("center", d3.forceCenter(width / 2, height / 2))
//   // .force(
//   //   "collision",
//   //   d3.forceCollide().radius(function(d) {
//   //     return d.radius;
//   //   })
//   // );
//   //forces for the text
//   const simulationText = d3
//     .forceSimulation(nodes)
//     .force("charge", d3.forceManyBody().strength(gravity))
//     .force("center", d3.forceCenter(width / 2, height / 2))
//     .force(
//       "collision",
//       d3.forceCollide().radius(function(d) {
//         return d.radius;
//       })
//     );
//   //  simulation for the circles
//   simulationCircles.nodes(nodes).on("tick", function(d) {
//     drawCircles
//       .attr("cx", function(d) {
//         return d.x;
//       })
//       .attr("cy", function(d) {
//         return d.y;
//       });
//   });
//   //simulation for the text
//   simulationText.nodes(nodes).on("tick", function(d) {
//     drawText
//       .attr("x", function(d) {
//         return d.x;
//       })
//       .attr("y", function(d) {
//         return d.y;
//       });
//   });

//   return (
//     <div className="box">
//       <div className="wrapper">
//         <IoIosAdd
//           className="icon"
//           onClick={() => {
//             nodes.push({ radius: Math.random() * 10 + 40 });
//             setNodes([...nodes]);
//             setShowSign(false);
//             remove();
//           }}
//         ></IoIosAdd>
//         <IoIosRemove
//           className="icon"
//           onClick={() => {
//             nodes.pop();
//             setNodes([...nodes]);
//             remove();
//             setShowSign(false);
//             // draw();
//           }}
//         ></IoIosRemove>
//       </div>
//       <div className="wrapper ">
//         <div className="show-sign">
//           {showSign ? <p>Click any button to start</p> : <div></div>}
//         </div>
//         <svg className="svg"></svg>
//       </div>
//       <div className="wrapper">
//         <p className="gravity-sign">Gravity</p>
//         <input
//           type="range"
//           min="-100"
//           max="100"
//           value={gravity}
//           onChange={event => {
//             setGravity(event.target.value);
//             remove();
//             setShowSign(false);
//           }}
//         ></input>
//       </div>
//     </div>
//   );
// });

// export default Circles;

//Versja standard
import React, { useState } from "react";
import * as d3 from "d3";
import "./App.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
// eslint-disable-next-line
const Circles = React.memo(props => {
  const [nodes, setNodes] = useState(
    d3.range(2).map(function(d) {
      return { radius: 42 };
    })
  );
  const [gravity, setGravity] = useState("5");
  const [showSign, setShowSign] = useState(true);

  const width = "1000px";
  const height = "100vh";
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
  console.log(nodes);
  var link = svg
    .selectAll("line")
    .data(nodes)
    .enter()
    .append("line")
    .style("stroke", "#aaa")
    .attr("x1", function(d) {
      return nodes[0].x + 200;
    })
    .attr("y1", function(d) {
      return nodes[0].y + 200;
    })
    .attr("x2", function(d) {
      // console.log(d);
      return d.x + 200;
    })
    .attr("y2", function(d) {
      return d.y + 200;
    });
  const drawCircles = svg

    .selectAll("rect")
    .data(nodes)
    .enter()
    .append("g")
    .append("rect")
    .attr("r", function(d) {
      return d.radius;
    })

    // .attr("cx", function(d) {
    //   return 150;
    // })
    // .attr("cy", function(d) {
    //   return 200;
    // })
    // .attr("x", function(d) {
    //   return Math.random() + 150;
    // })
    // .attr("y", function(d) {
    //   return Math.random() + 200;
    // })
    .attr("width", function(d) {
      return "150px";
    })
    .attr("height", function(d) {
      return "75px";
    })
    .classed("draggable", true)

    .style("fill", "#69a2b2")
    .call(
      d3
        .drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  // var svg = d3.select("svg");

  // drawing the text
  // const drawText = svg
  //   .append("g")
  //   .selectAll("text")
  //   .data(nodes)
  //   .enter()
  //   .append("text")
  //   .attr("text-anchor", "middle")
  //   .text("Lorem ipsum")
  //   .attr("font-size", function(d) {
  //     return d.radius * 0.3;
  //   })
  //   // .attr("r", 25)
  //   .style("fill", "#eee");
  console.log(nodes);
  //forces for the circles
  const simulationCircles = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(gravity))
    // .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collision",
      d3.forceCollide().radius(function(d) {
        return d.radius + 40;
      })
    );
  console.log(nodes);
  //forces for the text
  // const simulationText = d3
  //   .forceSimulation(nodes)
  //   .force("charge", d3.forceManyBody().strength(gravity))
  //   .force("center", d3.forceCenter(width / 2, height / 2))
  //   .force(
  //     "collision",
  //     d3.forceCollide().radius(function(d) {
  //       return d.radius;
  //     })
  //   );
  //  simulation for the circles
  simulationCircles.nodes(nodes).on("tick", function(d) {
    link
      .attr("x1", function(d) {
        return nodes[0].x + 275;
      })
      .attr("y1", function(d) {
        return nodes[0].y + 236;
      })
      .attr("x2", function(d) {
        return d.x + 275;
      })
      .attr("y2", function(d) {
        return d.y + 236;
      });
    drawCircles
      .attr("x", function(d) {
        return d.x + 200;
      })
      .attr("y", function(d) {
        return d.y + 200;
      });
  });

  function dragstarted(d) {
    if (!d3.event.active) simulationCircles.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulationCircles.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }

  //simulation for the text
  // simulationText.nodes(nodes).on("tick", function(d) {
  //   drawText
  //     .attr("x", function(d) {
  //       return d.x;
  //     })
  //     .attr("y", function(d) {
  //       return d.y;
  //     });
  // });

  return (
    <div className="box">
      <div className="wrapper">
        <IoIosAdd
          className="icon"
          onClick={() => {
            nodes.push({ radius: 42 });
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
      {/* <div className="wrapper">
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
      </div> */}
    </div>
  );
});

export default Circles;
