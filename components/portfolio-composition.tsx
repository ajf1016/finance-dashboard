"use client"
import SectorAllocation from "@/components/sector-allocation"
import OverlapAnalysis from "@/components/overlap-analysis"

export default function PortfolioComposition() {
  return (
    <div className="space-y-10">
      <SectorAllocation />
      <OverlapAnalysis />
    </div>
  )
}

