import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import Image from "next/image";

type Node = {
    name: string;
    x0?: number;
    x1?: number;
    y0?: number;
    y1?: number;
    index?: number;
};

type Link = {
    source: number | Node;
    target: number | Node;
    value: number;
    width?: number;
    sourceIndex?: number;
    targetIndex?: number;
};

type SankeyData = {
    nodes: Node[];
    links: Link[];
};

const data: SankeyData = {
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
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [processedData, setProcessedData] = useState<{
        nodes: Node[];
        links: Link[];
    } | null>(null);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [highlightColor, setHighlightColor] = useState<string>("");

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width,
                    height: Math.max(650, width * 0.6), // Maintain aspect ratio
                });
            }
        };

        handleResize(); // Initial size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Create sankey diagram and handle highlighting
    useEffect(() => {
        if (!svgRef.current || dimensions.width === 0) return;

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
            .style("font", "14px sans-serif");

        // Clear existing content
        svg.selectAll("*").remove();

        // Calculate appropriate margins to ensure labels are visible
        const marginLeft = Math.max(dimensions.width * 0.15, 160); // Reserve space for left labels
        const marginRight = Math.max(dimensions.width * 0.1, 100); // Reserve space for right labels

        const sankeyGenerator = sankey<Node, Link>()
            .nodeWidth(20)
            .nodePadding(30)
            .extent([
                [marginLeft, dimensions.height * 0.1],
                [dimensions.width - marginRight, dimensions.height * 0.9],
            ]);

        const sankeyData = sankeyGenerator({
            nodes: data.nodes.map((d) => Object.assign({}, d)),
            links: data.links.map((d) => Object.assign({}, d)),
        });

        // Process links to add source/target indices for easier filtering
        sankeyData.links.forEach((link) => {
            if (
                typeof link.source === "object" &&
                link.source.index !== undefined
            ) {
                link.sourceIndex = link.source.index;
            }
            if (
                typeof link.target === "object" &&
                link.target.index !== undefined
            ) {
                link.targetIndex = link.target.index;
            }
        });

        // Draw links
        svg.append("g")
            .selectAll(".link")
            .data(sankeyData.links)
            .join("path")
            .attr("class", "link")
            .attr("id", (d, i) => `link-${i}`)
            .attr("fill", "none")
            .attr("stroke-opacity", 0.6)
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke", "#2f3031")
            .attr("stroke-width", (d) => Math.max(1, d.width || 1))
            .attr(
                "data-source",
                (d) =>
                    (typeof d.source === "object"
                        ? d.source.index
                        : d.source) ?? ""
            )
            .attr(
                "data-target",
                (d) =>
                    (typeof d.target === "object"
                        ? d.target.index
                        : d.target) ?? ""
            );

        // Draw nodes
        svg.append("g")
            .selectAll(".node")
            .data(sankeyData.nodes)
            .join("rect")
            .attr("class", "node")
            .attr("id", (d, i) => `node-${i}`)
            .attr("x", (d) => d.x0 ?? 0)
            .attr("y", (d) => d.y0 ?? 0)
            .attr("height", (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
            .attr("width", 15)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
            .attr("stroke", "black")
            .attr("rx", 3)
            .attr("ry", 3);

        setProcessedData(sankeyData);
    }, [dimensions]);

    // Update highlighting based on active node
    useEffect(() => {
        if (!svgRef.current || !processedData) return;

        const svg = d3.select(svgRef.current);

        // Reset all links to default state
        svg.selectAll(".link")
            .transition()
            .duration(300)
            .attr("stroke", "#2f3031")
            .attr("stroke-opacity", 0.6);

        // Apply highlighting if there's an active node
        if (activeNode !== null) {
            // Find all links connected to the active node
            const relevantLinks = processedData.links.filter((link) => {
                const sourceIdx =
                    typeof link.source === "object"
                        ? link.source.index
                        : link.source;
                const targetIdx =
                    typeof link.target === "object"
                        ? link.target.index
                        : link.target;
                return sourceIdx === activeNode || targetIdx === activeNode;
            });

            // Highlight the relevant links
            relevantLinks.forEach((link, i) => {
                const sourceIdx =
                    typeof link.source === "object"
                        ? link.source.index
                        : link.source;
                const targetIdx =
                    typeof link.target === "object"
                        ? link.target.index
                        : link.target;

                svg.selectAll(
                    `.link[data-source="${sourceIdx}"][data-target="${targetIdx}"]`
                )
                    .transition()
                    .duration(300)
                    .attr("stroke", highlightColor)
                    .attr("stroke-opacity", 0.9);
            });
        }
    }, [activeNode, processedData, highlightColor]);

    // Calculate positions for fund labels
    const getFundLabelStyle = (node: Node, index: number) => {
        if (!node.x0 || !node.y0) return {};

        const centerY = node.y0 + ((node.y1 ?? node.y0) - node.y0) / 2;
        const color = d3.schemeCategory10[index % 10];

        return {
            position: "absolute",
            top: `${centerY - 30}px`,
            left: `${Math.max(10, node.x0 - 175)}px`, // Ensure minimum of 10px from left edge
            width: "150px",
            height: "60px",
            backgroundColor: color,
            color: "white",
            padding: "6px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transform: "translateX(0)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            boxShadow: activeNode === index ? "0 0 0 3px white" : "none",
        };
    };

    // Calculate positions for stock labels
    const getStockLabelStyle = (node: Node, index: number) => {
        if (!node.x1 || !node.y0) return {};

        const centerY = node.y0 + ((node.y1 ?? node.y0) - node.y0) / 2;
        const actualIndex = index + 5; // Offset for stock nodes
        const color = d3.schemeCategory10[actualIndex % 10];

        return {
            position: "absolute",
            top: `${centerY - 10}px`,
            left: `${node.x1 + 10}px`,
            padding: "4px 8px",
            borderRadius: "4px",
            // backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            textAlign: "left",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: 10,
            transform: "translateX(0)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            border: activeNode === actualIndex ? `2px solid ${color}` : "none",
        };
    };

    // Handler for clicking labels
    const handleLabelClick = (index: number, color: string) => {
        if (activeNode === index) {
            // If clicking the same node again, deactivate it
            setActiveNode(null);
            setHighlightColor("");
        } else {
            // Activate the clicked node
            setActiveNode(index);
            setHighlightColor(color);
        }
    };

    // Simplified fund names for labels
    const simplifyFundName = (name: string) => {
        // For "Fund - Direct Plan" pattern
        if (name.includes("Direct Plan")) {
            return name.split(" - ")[0];
        }
        // For "Fund" pattern
        if (name.includes("Fund")) {
            return name.split(" Fund")[0];
        }
        return name;
    };

    return (
        <div className="bg-neutral-900 text-white p-6 rounded-2xl">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-medium">Overlap Analysis</h2>
                {/* <div className="h-3 w-3 ml-2 bg-yellow-500 rounded-full"></div> */}
                <Image
                    src={"/assets/icons/warning.svg"}
                    alt="Change Icon"
                    width={16}
                    height={16}
                    className="ml-1 h-3 h-3"
                />
            </div>

            <div>
                <p className="text-gray-300">
                    Comparing: Motilal Large Cap Fund and Nippon Large Cap Fund
                </p>
                <ul className="mt-2 space-y-1">
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>6 Stocks Overlap across these funds.</span>
                    </li>
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>42% Average Overlap in holdings.</span>
                    </li>
                </ul>
            </div>

            <div
                ref={containerRef}
                className="relative w-full mt-6 overflow-hidden"
            >
                <div className="overflow-x-auto pb-4">
                    <div className="min-w-full" style={{ minHeight: "500px" }}>
                        <svg
                            ref={svgRef}
                            className="w-full h-auto"
                            style={{ minHeight: "500px" }}
                        />

                        {processedData && (
                            <>
                                {/* Left-side fund labels */}
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                    {processedData.nodes
                                        .slice(0, 5)
                                        .map((node, index) => (
                                            <div
                                                key={`fund-${index}`}
                                                style={
                                                    getFundLabelStyle(
                                                        node,
                                                        index
                                                    ) as React.CSSProperties
                                                }
                                                className="shadow-md overflow-hidden pointer-events-auto"
                                                onClick={() =>
                                                    handleLabelClick(
                                                        index,
                                                        d3.schemeCategory10[
                                                            index % 10
                                                        ]
                                                    )
                                                }
                                            >
                                                {simplifyFundName(node.name)}
                                            </div>
                                        ))}
                                </div>

                                {/* Right-side stock labels */}
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                    {processedData.nodes
                                        .slice(5)
                                        .map((node, index) => (
                                            <div
                                                key={`stock-${index}`}
                                                style={
                                                    getStockLabelStyle(
                                                        node,
                                                        index
                                                    ) as React.CSSProperties
                                                }
                                                className="pointer-events-auto"
                                                onClick={() =>
                                                    handleLabelClick(
                                                        index + 5,
                                                        d3.schemeCategory10[
                                                            (index + 5) % 10
                                                        ]
                                                    )
                                                }
                                            >
                                                {node.name}
                                            </div>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Reset button */}
                {/* {activeNode !== null && (
                    <button
                        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                        onClick={() => {
                            setActiveNode(null);
                            setHighlightColor("");
                        }}
                    >
                        Reset Highlighting
                    </button>
                )} */}
            </div>
        </div>
    );
};

export default OverlapAnalysis;
