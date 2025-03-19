"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { calculateSectorAllocation } from "@/lib/data-utils"

export default function SectorAllocation() {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null)
  const sectors = calculateSectorAllocation()

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-500 mb-6">Sector Allocation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Banking sector grid */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
          {sectors[0].items.map((bank) => (
            <motion.div
              key={bank.name}
              className={`${bank.color} bg-opacity-20 rounded-lg p-4 relative overflow-hidden`}
              onMouseEnter={() => setHoveredSector("banking")}
              onMouseLeave={() => setHoveredSector(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {hoveredSector === "banking" && (
                <motion.div
                  className="absolute inset-0 z-0 opacity-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={sectors[0].hoverImage || "/placeholder.svg"}
                    alt="Banking sector"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
              <div className="relative z-10">
                <div className="font-medium">{bank.name}</div>
                <div className="text-gray-300">{bank.value}</div>
                <div className="text-2xl font-bold mt-4 text-right">{bank.percentage}%</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other sectors */}
        {sectors.slice(1).map((sector) => (
          <motion.div
            key={sector.id}
            className={`${sector.color} bg-opacity-20 rounded-lg p-4 relative overflow-hidden`}
            onMouseEnter={() => setHoveredSector(sector.id)}
            onMouseLeave={() => setHoveredSector(null)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {hoveredSector === sector.id && (
              <motion.div
                className="absolute inset-0 z-0 opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={sector.hoverImage || "/placeholder.svg"}
                  alt={sector.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            <div className="relative z-10">
              <div className="font-medium">{sector.name}</div>
              <div className="text-gray-300">{sector.value}</div>
              <div className="text-2xl font-bold mt-4 text-right">{sector.percentage}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

