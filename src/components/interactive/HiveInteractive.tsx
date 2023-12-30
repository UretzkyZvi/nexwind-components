import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const HiveInteractive: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const svgPath = `/images/updated_hive.svg`;

    // Load the SVG file
    d3.xml(svgPath).then((data) => {
      svg.node()?.appendChild(data.documentElement);

      // Store the original color of each element and set default attributes
      const hexagons = svg.selectAll("path, polygon")
        .each(function() {
          const current = d3.select(this);
          current.attr("data-original-color", current.style("fill"));
        });

      // Add interactivity
      hexagons.on("mouseover", function () {
        d3.select(this).style("fill", "#ffcc00"); // Highlight color
      })
      .on("mouseout", function () {
        const originalColor = d3.select(this).attr("data-original-color");
        d3.select(this).style("fill", originalColor); // Revert to original color
      });

      svg.selectAll("path, polygon")
      .attr("class", "hexagon-hover")
      .attr("fill", "#292154") // Default fill
      .attr("stroke", "#292154"); // Default stroke
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      preserveAspectRatio="xMidYMid slice"
    />
  );
};

export default HiveInteractive;
