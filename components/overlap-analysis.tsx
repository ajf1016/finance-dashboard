"use client"

import { useEffect, useRef } from "react"
import { Info } from "lucide-react"
import { usePortfolioStore } from "@/lib/store"

export default function OverlapAnalysis() {
  const { funds, stocks, connections, selectedFund, highlightedStocks, setSelectedFund } = usePortfolioStore()

  const svgRef = useRef<SVGSVGElement>(null)

  // Check if a stock is highlighted
  const isStockHighlighted = (stockId: string) => {
    return highlightedStocks.includes(stockId)
  }

  // Draw the Sankey diagram
  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const svgWidth = svg.clientWidth || 1000
    const svgHeight = svg.clientHeight || 400

    // Clear existing paths
    const existingPaths = svg.querySelectorAll("path")
    existingPaths.forEach((path) => path.remove())

    // Calculate positions
    const leftMargin = 200
    const rightMargin = 150
    const topMargin = 80
    const bottomMargin = 80

    const fundSpacing = (svgHeight - topMargin - bottomMargin) / (funds.length - 1)
    const stockSpacing = (svgHeight - topMargin - bottomMargin) / (stocks.length - 1)

    // Draw connections
    connections.forEach((conn) => {
      // Find the fund and stock positions
      const fundIndex = funds.findIndex((f) => f.id === conn.fund)
      const stockIndex = stocks.findIndex((s) => s.id === conn.stock)

      if (fundIndex === -1 || stockIndex === -1) return

      // Calculate positions
      const fundY = topMargin + fundIndex * fundSpacing
      const stockY = topMargin + stockIndex * stockSpacing

      // Determine if this connection should be highlighted
      const isHighlighted = selectedFund === conn.fund || selectedFund === null

      // Create path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

      // Set path attributes
      path.setAttribute(
        "d",
        `M ${leftMargin} ${fundY} C ${leftMargin + 200} ${fundY}, ${svgWidth - rightMargin - 200} ${stockY}, ${svgWidth - rightMargin} ${stockY}`,
      )
      path.setAttribute("fill", "none")
      path.setAttribute("stroke", isHighlighted ? funds[fundIndex].color : "#333")
      path.setAttribute("stroke-width", isHighlighted ? conn.weight.toString() : "1")
      path.setAttribute("stroke-opacity", isHighlighted ? "0.7" : "0.3")

      // Add path to SVG
      svg.appendChild(path)
    })
  }, [funds, stocks, connections, selectedFund, highlightedStocks])

  return (
    <div className="mt-10">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-500">Overlap Analysis</h2>
        <Info className="w-4 h-4 ml-2 text-gray-400" />
      </div>

      <div className="mb-4">
        <p className="text-gray-300">Comparing : Motilal Large Cap Fund and Nippon Large Cap Fund</p>
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

      <div className="relative h-[400px] mt-8 bg-gray-900 bg-opacity-30 rounded-lg p-4">
        <div className="absolute left-0 top-0 bottom-0 w-[200px] flex flex-col justify-around py-8">
          {funds.map((fund) => (
            <div
              key={fund.id}
              className={`
                p-3 rounded-md cursor-pointer transition-all
                ${selectedFund === fund.id ? "border-l-4" : "border-l-2"}
              `}
              style={{
                borderLeftColor: fund.color,
                backgroundColor: selectedFund === fund.id ? fund.backgroundColor : "transparent",
              }}
              onClick={() => setSelectedFund(fund.id)}
            >
              <div className="text-sm font-medium">{fund.name}</div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-[150px] flex flex-col justify-around py-8">
          {stocks.map((stock) => (
            <div
              key={stock.id}
              className={`
                p-2 rounded-md transition-all
                ${isStockHighlighted(stock.id) ? "bg-gray-800" : "bg-transparent"}
                ${isStockHighlighted(stock.id) ? "border-r-4" : "border-r-2"}
              `}
              style={{ borderRightColor: stock.color }}
            >
              <div className="text-sm font-medium text-right">{stock.name}</div>
            </div>
          ))}
        </div>

        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        />
      </div>
    </div>
  )
}

