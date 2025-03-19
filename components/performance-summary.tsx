"use client"

import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { usePortfolioStore } from "@/lib/store"
import type { TimePeriod } from "@/lib/store"

// Define time periods for filtering
const timePeriods: { id: TimePeriod; label: string }[] = [
  { id: "1M", label: "1M" },
  { id: "3M", label: "3M" },
  { id: "6M", label: "6M" },
  { id: "1Y", label: "1Y" },
  { id: "3Y", label: "3Y" },
  { id: "MAX", label: "MAX" },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-800 p-2 rounded shadow-lg border border-gray-700">
        <p className="text-sm font-medium">{data.formattedDate}</p>
        <p className="text-sm text-blue-400">₹{Math.round(data.value).toLocaleString("en-IN")}</p>
      </div>
    )
  }

  return null
}

export default function PerformanceSummary() {
  const { selectedTimePeriod, performanceData, setSelectedTimePeriod } = usePortfolioStore()

  const [hoveredPoint, setHoveredPoint] = useState<any>(null)

  // Calculate current value and growth
  const currentValue = performanceData.length > 0 ? performanceData[performanceData.length - 1].value : 0
  const initialValue = performanceData.length > 0 ? performanceData[0].value : 0
  const growth = currentValue - initialValue
  const growthPercentage = initialValue > 0 ? (growth / initialValue) * 100 : 0

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Performance Summary</h2>

      <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg mb-8">
        <div className="text-2xl font-bold">₹{Math.round(currentValue).toLocaleString("en-IN")}</div>
        <div className="flex items-center mt-1">
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${growth >= 0 ? "bg-green-500" : "bg-red-500"}`}
          >
            {growth >= 0 ? "+" : "-"}
          </div>
          <span className="text-gray-400">₹{Math.abs(Math.round(growth)).toLocaleString("en-IN")}</span>
          <span className="mx-2 text-gray-500">|</span>
          <span className={`${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
            {Math.abs(growthPercentage).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            onMouseMove={(data) => {
              if (data.activePayload) {
                setHoveredPoint(data.activePayload[0].payload)
              }
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis hide domain={["dataMin - 100000", "dataMax + 100000"]} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#6B7280", strokeWidth: 1, strokeDasharray: "5 5" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {hoveredPoint && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {timePeriods.map((period) => (
          <button
            key={period.id}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedTimePeriod === period.id
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTimePeriod(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  )
}

