import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { thresholdScott, thresholds } from "d3";
import hist from "../data/timingout.json";


const Histogram = (props) => {
  const { width, height } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      getURLData();
    }
  }, [data]);
  const getURLData = async () => {
    // build a dictionary to record the path of each state in the json response
    let stateFreq = {};
    hist.forEach((element) => {
      if (stateFreq[element.slack] > 0) {
        stateFreq[element.slack] = stateFreq[element.slack] + 1;
      } else {
        stateFreq[element.slack] = 1;
      }
    });
    // convert the dictionary to an array
    let stateFreqArray = Object.keys(stateFreq).map(function (key) {
      return { slack: key, path: stateFreq[key] };
    });
    // console.log(stateFreqArray);

    // sort the array by path and send it to the data variable
    setData(
      stateFreqArray.sort((a, b) => {
        return a.slack - b.slack;
      })
    );
  };
  // console.log(data);

  const drawChart = () => {
    // declare margins
    const margin = { top: 90, right: 70, bottom: 90, left: 70 }; 
    
    // create the svg that holds the chart
    const svg = d3
      .select("#histogram")
      .append("svg")
      .style("background-color", "grey")
      .attr("width", width + 30)
      .attr("height", height + 20)
      .append("g")
      .attr("transform", `translate(0,-${margin.bottom - 100})`)
    // .thresholds(update(5));

    // create the x axis scale, scaled to the states
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.slack))
      // .domain([d3.min(data, (d) => d.slack),d3.max(data, (d) => d.slack)])
      .rangeRound([margin.left, width - margin.right]);

    // create the y axis scale, scaled from 0 to the max
    const a = d3.max(data, (d) => d.path)

    // console.log(a)
    const yScale = d3
      .scaleLinear()
      .domain([0, a])
      // .domain([0, 25])
      .range([height - margin.bottom, margin.top]);

    // create a scale between colors that varies by the path( need to change)
    const barColors = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.slack)])
      .range(["red", "green"])
    // .attr("fill",(d, i) => d > 35 ? "")

    
    
    
    // set the x axis on the bottom.
    // tilts the axis text so it's readable and not smushed.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    
    
    
      /////****x axis label start here****/////
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 350)
      .attr("y", height - 19)
      .text("slack values");
    /////****x axis label end here****/////
    
    
    
    /////****y axis label start here****/////
    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 19)
      .attr("x", -350)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("count of path");
    /////****x axis label end here****/////
    
    
    
    ////****set the y axis on the left****/////
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

   


    // create the actual bars on the graph, appends a 'rect' for every data element
    // sets the x and y positions relative to the scales already established
    // sets the height according to the yscale
    // static bar width, color is scaled on the y axis
    // finally the bars have an outline
    const bars = svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.slack))
      .attr("y", (d) => yScale(d.path))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.path))
      .style("padding", "0px")
      .style("margin", "1px")
      // .thresholds(xScale.ticks(5))
      // .thresholds(d3.range(1, x.domain()[1], (x.domain()[1]-1)/6))
      .style("width", (d) => `${d * 10}px`)
      .attr("fill", function (d) {
        return barColors(d.slack);
      })
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  };

  return (
    <div>
      {/* <h4>Histogram </h4> */}
      <div id="histogram" />
    </div>
  );
};

export default Histogram;