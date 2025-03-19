import { ArrowUp, ArrowDown } from "lucide-react"

export default function InvestmentSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-900 rounded-lg p-4 flex">
        <div className="border-l-4 border-blue-500 pl-4 flex-1">
          <div className="text-sm text-gray-400">Current</div>
          <div className="text-lg font-semibold">Investment Value</div>
          <div className="text-2xl font-bold mt-2">₹5,75,000</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>+0.6%</span>
          </div>
          <div className="text-xs text-gray-400">1D Return</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 flex">
        <div className="border-l-4 border-blue-500 pl-4 flex-1">
          <div className="text-sm text-gray-400">Initial</div>
          <div className="text-lg font-semibold">Investment Value</div>
          <div className="text-2xl font-bold mt-2">₹5,00,000</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>+15%</span>
          </div>
          <div className="text-xs text-gray-400">Inception</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 flex">
        <div className="border-l-4 border-blue-500 pl-4 flex-1">
          <div className="text-sm text-gray-400">Best</div>
          <div className="text-lg font-semibold">Performing Scheme</div>
          <div className="text-xl font-bold mt-2">ICICI Prudential Midcap Fund</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>+19%</span>
          </div>
          <div className="text-xs text-gray-400">Inception</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 flex">
        <div className="border-l-4 border-blue-500 pl-4 flex-1">
          <div className="text-sm text-gray-400">Worst</div>
          <div className="text-lg font-semibold">Performing Scheme</div>
          <div className="text-xl font-bold mt-2">Axis Flexi Cap Fund</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center text-red-500">
            <ArrowDown className="h-4 w-4 mr-1" />
            <span>-5%</span>
          </div>
          <div className="text-xs text-gray-400">Inception</div>
        </div>
      </div>
    </div>
  )
}

