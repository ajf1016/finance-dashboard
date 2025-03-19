import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { generatePerformanceData } from "@/lib/data-utils"

// Define types
export type TimePeriod = "1M" | "3M" | "6M" | "1Y" | "3Y" | "MAX"
export type Fund = {
  id: string
  name: string
  color: string
  backgroundColor?: string
}
export type Stock = {
  id: string
  name: string
  color: string
}
export type Connection = {
  fund: string
  stock: string
  weight: number
}

// Define the store state
interface PortfolioState {
  // Performance data
  selectedTimePeriod: TimePeriod
  performanceData: any[]

  // Overlap analysis
  selectedFund: string | null
  highlightedStocks: string[]
  funds: Fund[]
  stocks: Stock[]
  connections: Connection[]

  // Actions
  setSelectedTimePeriod: (period: TimePeriod) => void
  setSelectedFund: (fundId: string | null) => void

  // Computed
  getHighlightedConnections: () => Connection[]
}

// Create the store
export const usePortfolioStore = create<PortfolioState>()(
  devtools((set, get) => ({
    // Initial state
    selectedTimePeriod: "1M",
    performanceData: generatePerformanceData(30), // 1M data

    selectedFund: null,
    highlightedStocks: [],

    funds: [
      { id: "nippon", name: "Nippon Large Cap Fund - Direct Plan", color: "#D4AF37", backgroundColor: "#5D4C0A" },
      { id: "motilal", name: "Motilal Large Cap Fund - Direct Plan", color: "#4169E1", backgroundColor: "#1E3A8A" },
      { id: "hdfc", name: "HDFC Large Cap Fund", color: "#CD853F", backgroundColor: "#543311" },
      { id: "icici", name: "ICICI Prudential Midcap Fund", color: "#9ACD32", backgroundColor: "#3A5311" },
    ],

    stocks: [
      { id: "hdfc_ltd", name: "HDFC LTD.", color: "#FFD700" },
      { id: "ril", name: "RIL", color: "#4CAF50" },
      { id: "infy", name: "INFY", color: "#9C27B0" },
      { id: "tcs", name: "TCS", color: "#00BCD4" },
      { id: "hdfcbank", name: "HDFCBANK", color: "#FF5722" },
      { id: "bhartiartl", name: "BHARTIARTL", color: "#E91E63" },
    ],

    connections: [
      { fund: "nippon", stock: "hdfc_ltd", weight: 8 },
      { fund: "nippon", stock: "ril", weight: 7 },
      { fund: "nippon", stock: "infy", weight: 6 },
      { fund: "nippon", stock: "tcs", weight: 5 },
      { fund: "nippon", stock: "hdfcbank", weight: 4 },
      { fund: "motilal", stock: "hdfc_ltd", weight: 7 },
      { fund: "motilal", stock: "ril", weight: 8 },
      { fund: "motilal", stock: "infy", weight: 5 },
      { fund: "motilal", stock: "tcs", weight: 6 },
      { fund: "motilal", stock: "bhartiartl", weight: 4 },
      { fund: "hdfc", stock: "hdfc_ltd", weight: 9 },
      { fund: "hdfc", stock: "hdfcbank", weight: 8 },
      { fund: "hdfc", stock: "ril", weight: 6 },
      { fund: "hdfc", stock: "tcs", weight: 5 },
      { fund: "icici", stock: "infy", weight: 7 },
      { fund: "icici", stock: "bhartiartl", weight: 8 },
      { fund: "icici", stock: "ril", weight: 6 },
    ],

    // Actions
    setSelectedTimePeriod: (period) => {
      const days =
        period === "1M"
          ? 30
          : period === "3M"
            ? 90
            : period === "6M"
              ? 180
              : period === "1Y"
                ? 365
                : period === "3Y"
                  ? 1095
                  : 1825 // MAX

      set({
        selectedTimePeriod: period,
        performanceData: generatePerformanceData(days),
      })
    },

    setSelectedFund: (fundId) => {
      const currentSelectedFund = get().selectedFund

      // If clicking the same fund, deselect it
      if (fundId === currentSelectedFund) {
        set({ selectedFund: null, highlightedStocks: [] })
        return
      }

      // Find all stocks connected to this fund
      const connections = get().connections
      const connectedStocks = connections.filter((conn) => conn.fund === fundId).map((conn) => conn.stock)

      set({
        selectedFund: fundId,
        highlightedStocks: connectedStocks,
      })
    },

    // Computed values
    getHighlightedConnections: () => {
      const { selectedFund, connections } = get()

      if (!selectedFund) return connections

      return connections.filter((conn) => conn.fund === selectedFund)
    },
  })),
)

