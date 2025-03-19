// Generate sample data for the performance chart
export const generatePerformanceData = (days: number) => {
  const data = []
  const startDate = new Date(2025, 1, 7) // Feb 7, 2025
  const startValue = 5000000 // 5,00,000

  // Generate random fluctuations with an upward trend
  let currentValue = startValue

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    // Add some randomness with a slight upward bias
    const change = (Math.random() - 0.45) * (startValue * 0.01)
    currentValue += change

    // Add some seasonal patterns
    const seasonalFactor = Math.sin((i / 30) * Math.PI) * (startValue * 0.02)

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.max(currentValue + seasonalFactor, startValue * 0.9),
      formattedDate: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
    })
  }

  return data
}

// Calculate sector allocation data
export const calculateSectorAllocation = () => {
  return [
    {
      id: "banking",
      items: [
        { name: "HDFC Bank", value: "₹78,000", percentage: 40, color: "bg-blue-300" },
        { name: "ICICI Bank", value: "₹58,500", percentage: 30, color: "bg-blue-300" },
        { name: "Bajaj Finance", value: "₹19,500", percentage: 10, color: "bg-blue-300" },
        { name: "Kotak Mahindra Bank", value: "₹39,000", percentage: 20, color: "bg-blue-300" },
      ],
      hoverImage: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      value: "₹83,250",
      percentage: 14.5,
      color: "bg-blue-200",
      hoverImage: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "technology",
      name: "Technology",
      value: "₹1,11,000",
      percentage: 19,
      color: "bg-blue-200",
      hoverImage: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "consumer",
      name: "Consumer Goods",
      value: "₹55,500",
      percentage: 9.5,
      color: "bg-blue-200",
      hoverImage: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "energy",
      name: "Energy",
      value: "₹55,500",
      percentage: 9.5,
      color: "bg-blue-200",
      hoverImage: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "other",
      name: "Other Sectors",
      value: "₹55,500",
      percentage: 9.5,
      color: "bg-blue-200",
      hoverImage: "/placeholder.svg?height=300&width=300",
    },
  ]
}

