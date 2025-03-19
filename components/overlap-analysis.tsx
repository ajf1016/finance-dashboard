import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, SankeyGraph } from "d3-sankey";
import { Info } from "lucide-react";
import Image from "next/image";

type Node = {
    name: string;
    x?: number;
    y?: number;
};

type Link = {
    source: number;
    target: number;
    value: number;
};

const data: SankeyGraph<Node, Link> = {
    nodes: [
        { name: "Nippon Large Cap Fund - Direct Plan" },
        { name: "Axis Bluechip Fund" },
        { name: "Motilal Large Cap Fund - Direct Plan" },
        { name: "HDFC Large Cap Fund" },
        { name: "ICICI Prudential Midcap Fund" },
        { name: "HDFC LTD." },
        { name: "RIL" },
        { name: "INFY" },
        { name: "TCS" },
        { name: "HDFCBANK" },
        { name: "BHARTIARTL" },
    ],
    links: [
        { source: 0, target: 5, value: 4 },
        { source: 0, target: 6, value: 5 },
        { source: 0, target: 7, value: 1 },
        { source: 0, target: 8, value: 2 },
        { source: 0, target: 9, value: 1 },
        { source: 0, target: 10, value: 5 },
        { source: 2, target: 5, value: 5 },
        { source: 2, target: 6, value: 3 },
        { source: 2, target: 7, value: 4 },
        { source: 2, target: 8, value: 4 },
        { source: 2, target: 9, value: 1 },
        { source: 2, target: 10, value: 2 },
        { source: 1, target: 5, value: 2 },
        { source: 1, target: 6, value: 2 },
        { source: 1, target: 7, value: 4 },
        { source: 1, target: 8, value: 3 },
        { source: 1, target: 9, value: 4 },
        { source: 1, target: 10, value: 2 },
        { source: 3, target: 5, value: 2 },
        { source: 3, target: 6, value: 1 },
        { source: 3, target: 7, value: 5 },
        { source: 3, target: 8, value: 5 },
        { source: 3, target: 9, value: 3 },
        { source: 3, target: 10, value: 3 },
        { source: 4, target: 5, value: 5 },
        { source: 4, target: 6, value: 5 },
        { source: 4, target: 7, value: 2 },
        { source: 4, target: 8, value: 4 },
        { source: 4, target: 9, value: 6 },
        { source: 4, target: 10, value: 4 },
    ],
};

const OverlapAnalysis: React.FC = () => {
    const ref = useRef<SVGSVGElement | null>(null);
    const [nodePositions, setNodePositions] = useState<Node[]>([]);

    useEffect(() => {
        if (!ref.current) return;
        const width = 1000;
        const height = 650;

        const svg = d3
            .select(ref.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("font", "14px sans-serif");

        const sankeyGenerator = sankey<Node, Link>()
            .nodeWidth(20)
            .nodePadding(30)
            .extent([
                [100, 80],
                [width, height - 80],
            ]);

        const { nodes, links } = sankeyGenerator({
            nodes: data.nodes.map((d) => Object.assign({}, d)),
            links: data.links.map((d) => Object.assign({}, d)),
        });

        setNodePositions(
            nodes.map((d) => ({
                ...d,
                x: d.x0 ?? 0,
                y: (d.y0 ?? 0) + ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2,
            }))
        );

        svg.selectAll(".link")
            .data(links)
            .join("path")
            .attr("fill", "none")
            .attr("position", "relative")
            .attr("stroke-opacity", 0.6)
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke", "#2f3031")
            .attr("stroke-width", (d) => Math.max(1, d.width || 1));

        svg.selectAll(".node")
            .data(nodes)
            .join("rect")
            .attr("x", (d) => (d.x0 ? d.x0 + 2 : 0))
            .attr("y", (d) => d.y0 ?? 0)

            .attr("height", (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
            // .attr("width", sankeyGenerator.nodeWidth() + 40)
            .attr("width", 15)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
            .attr("stroke", "black")
            .attr("rx", 3)
            .attr("ry", 3);
    }, []);

    return (
        <div
            className="bg-[#1B1A1A] text-white p-6"
            style={{ borderRadius: "1rem" }}
        >
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-medium">Overlap Analysis</h2>
                <Image
                    src="/assets/icons/warning.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="h-3 w-3 ml-2"
                />
            </div>

            <div>
                <p className="text-gray-300">
                    Comparing : Motilal Large Cap Fund and Nippon Large Cap Fund
                </p>
                <ul className="mt-2 space-y-1">
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>X Stocks Overlap across these funds.</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>Y% Average Overlap in holdings.</span>
                    </li>
                </ul>
            </div>

            <div style={{ position: "relative" }}>
                <svg ref={ref} width={1200} height={650}></svg>

                {/* Left-Side Fund Labels */}
                {nodePositions.slice(0, 5).map((node, index) => {
                    return (
                        // Add return statement
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: node.y ? node.y - 30 : 0,
                                left: node.x ? node.x - 60 : 0,
                                width: "150px",
                                // height: (node.y1 ?? 0) - (node.y0 ?? 0),
                                height: 55,
                                backgroundColor:
                                    d3.schemeCategory10[index % 10],
                                color: "white",
                                padding: "6px",
                                borderRadius: "8px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "bold",
                                alignContent: "center",
                            }}
                        >
                            {node.name}
                        </div>
                    );
                })}

                {/* Right-Side Stock Labels */}
                {nodePositions.slice(5).map((node, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            top: node.y ? node.y - 10 : 0,
                            left: node.x ? node.x + 130 : 0,
                            width: "100px",
                            backgroundColor: "transparent",
                            color: "white",
                            textAlign: "left",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                    >
                        {node.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverlapAnalysis;

// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import { sankey, sankeyLinkHorizontal, SankeyGraph } from "d3-sankey";
// import { Info } from "lucide-react";

// type Node = {
//     name: string;
//     x?: number;
//     y?: number;
// };

// type Link = {
//     source: number;
//     target: number;
//     value: number;
// };

// const data: SankeyGraph<Node, Link> = {
//     nodes: [
//         { name: "Nippon Large Cap Fund - Direct Plan" },
//         { name: "Motilal Large Cap Fund - Direct Plan" },
//         { name: "Axis Bluechip Fund" },
//         { name: "HDFC Large Cap Fund" },
//         { name: "ICICI Prudential Midcap Fund" },
//         { name: "HDFC LTD." },
//         { name: "RIL" },
//         { name: "INFY" },
//         { name: "TCS" },
//         { name: "HDFCBANK" },
//         { name: "BHARTIARTL" },
//     ],
//     links: [
//         { source: 0, target: 5, value: 4 },
//         { source: 0, target: 6, value: 5 },
//         { source: 1, target: 5, value: 5 },
//         { source: 1, target: 6, value: 3 },
//         { source: 2, target: 5, value: 2 },
//         { source: 2, target: 7, value: 4 },
//         { source: 3, target: 5, value: 2 },
//         { source: 3, target: 6, value: 1 },
//         { source: 3, target: 7, value: 5 },
//         { source: 4, target: 5, value: 5 },
//         { source: 4, target: 7, value: 2 },
//         { source: 4, target: 8, value: 4 },
//     ],
// };

// const OverlapAnalysis: React.FC = () => {
//     const ref = useRef<SVGSVGElement | null>(null);
//     const [nodePositions, setNodePositions] = useState<Node[]>([]);

//     useEffect(() => {
//         if (!ref.current) return;
//         const width = 1000;
//         const height = 650;

//         const svg = d3
//             .select(ref.current)
//             .attr("viewBox", `0 0 ${width} ${height}`)
//             .style("font", "14px sans-serif");

//         const sankeyGenerator = sankey<Node, Link>()
//             .nodeWidth(20)
//             .nodePadding(40) // Increase padding for better spacing
//             .extent([
//                 [180, 100], // Adjusted to better align with Figma layout
//                 [width - 100, height - 100],
//             ]);

//         const { nodes, links } = sankeyGenerator({
//             nodes: data.nodes.map((d) => Object.assign({}, d)),
//             links: data.links.map((d) => Object.assign({}, d)),
//         });

//         setNodePositions(
//             nodes.map((d) => ({
//                 ...d,
//                 x: d.x0 ?? 0,
//                 y: (d.y0 ?? 0) + ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2,
//             }))
//         );

//         svg.selectAll(".link")
//             .data(links)
//             .join("path")
//             .attr("fill", "none")
//             .attr("stroke-opacity", 0.6)
//             .attr("d", sankeyLinkHorizontal())
//             .attr("stroke", "#888")
//             .attr("stroke-width", (d) => Math.max(2, d.width || 1));

//         svg.selectAll(".node")
//             .data(nodes)
//             .join("rect")
//             .attr("x", (d) => (d.x0 ? d.x0 + 5 : 0)) // Shift slightly for better alignment
//             .attr("y", (d) => d.y0 ?? 0)
//             .attr("height", (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
//             .attr("width", 15)
//             .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
//             .attr("stroke", "black")
//             .attr("rx", 3)
//             .attr("ry", 3);
//     }, []);

//     return (
//         <div className="bg-[#1B1A1A] text-white p-6 rounded-xl">
//             <div className="flex items-center mb-4">
//                 <h2 className="text-xl font-semibold text-blue-500">
//                     Overlap Analysis
//                 </h2>
//                 <Info className="w-4 h-4 ml-2 text-gray-400" />
//             </div>

//             <div className="mb-4">
//                 <p className="text-gray-300">
//                     Comparing : Motilal Large Cap Fund and Nippon Large Cap Fund
//                 </p>
//                 <ul className="mt-2 space-y-1">
//                     <li className="flex items-center">
//                         <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
//                         <span>X Stocks Overlap across these funds.</span>
//                     </li>
//                     <li className="flex items-center">
//                         <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
//                         <span>Y% Average Overlap in holdings.</span>
//                     </li>
//                 </ul>
//             </div>

//             <div style={{ position: "relative" }}>
//                 <svg ref={ref} width={1000} height={650}></svg>

//                 {/* Left-Side Fund Labels */}
//                 {nodePositions.slice(0, 5).map((node, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             position: "absolute",
//                             top: node.y - 10,
//                             left: node.x - 160, // Shifted left for correct positioning
//                             width: "150px",
//                             backgroundColor: d3.schemeCategory10[index % 10],
//                             color: "white",
//                             padding: "6px",
//                             borderRadius: "8px",
//                             textAlign: "center",
//                             fontSize: "12px",
//                             fontWeight: "bold",
//                         }}
//                     >
//                         {node.name}
//                     </div>
//                 ))}

//                 {/* Right-Side Stock Labels */}
//                 {nodePositions.slice(5).map((node, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             position: "absolute",
//                             top: node.y - 10,
//                             left: node.x + 30, // Shifted right for better placement
//                             width: "100px",
//                             backgroundColor: "transparent",
//                             color: "white",
//                             textAlign: "left",
//                             fontSize: "12px",
//                             fontWeight: "bold",
//                         }}
//                     >
//                         {node.name}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default OverlapAnalysis;
