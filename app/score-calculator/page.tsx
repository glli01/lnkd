"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calculator, Clock } from "lucide-react"
import Link from "next/link"

export default function ScoreCalculator() {
  const [scores, setScores] = useState({
    queens: "",
    tango: "",
    zip: "",
    backtracks: "",
  })

  const [calculatedScore, setCalculatedScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formulaBreakdown, setFormulaBreakdown] = useState<{
    queensPart: string
    tangoPart: string
    zipPart: string
    backtracksPart: string
    total: number
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setScores((prev) => ({ ...prev, [name]: value }))
  }

  const calculateScore = () => {
    // Show loading state
    setIsLoading(true)
    setFormulaBreakdown(null)

    // Simulate API call or complex calculation
    setTimeout(() => {
      // Parse input values
      const queensTime = Number.parseFloat(scores.queens) || 0
      const tangoTime = Number.parseFloat(scores.tango) || 0
      const zipTime = Number.parseFloat(scores.zip) || 0
      const zipBacktracks = Number.parseInt(scores.backtracks) || 0

      // Calculate using the formula: Score = (Queens time x 1.5) + (Tango time) + (Zip time) + (Zip backtracks x 3)
      const queensScore = queensTime * 1.5
      const tangoScore = tangoTime
      const zipScore = zipTime
      const backtracksScore = zipBacktracks * 3

      const total = queensScore + tangoScore + zipScore + backtracksScore

      // Create formula breakdown
      setFormulaBreakdown({
        queensPart: `(${queensTime} × 1.5)`,
        tangoPart: `${tangoTime}`,
        zipPart: `${zipTime}`,
        backtracksPart: `(${zipBacktracks} × 3)`,
        total: Number.parseFloat(total.toFixed(1)),
      })

      setCalculatedScore(Number.parseFloat(total.toFixed(1)))
      setIsLoading(false)
    }, 1500)
  }

  // CSS class to hide number input spinners
  const noSpinnerClass =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-300 mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-black/80 border border-blue-200/50 dark:border-blue-700/50 shadow-xl p-6 rounded-2xl">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300">
                Score Calculator
              </h1>
            </div>

            <div className="space-y-6">
              {/* Queens Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="queens"
                  className="text-lg font-medium text-blue-700 dark:text-blue-300 flex items-center"
                >
                  <Clock className="h-4 w-4 mr-1.5" />
                  Queens Time
                </Label>
                <div className="relative">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Input
                      id="queens"
                      name="queens"
                      type="number"
                      step="0.1"
                      placeholder="Enter Queens time"
                      value={scores.queens}
                      onChange={handleChange}
                      className={`h-12 pl-4 pr-12 border-2 border-blue-300/50 dark:border-blue-700/50 focus:border-blue-500 
                                 dark:focus:border-blue-400 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-sm
                                 text-blue-800 dark:text-blue-200 placeholder:text-blue-400/70 dark:placeholder:text-blue-500/70 ${noSpinnerClass}`}
                    />
                  </motion.div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500/70 dark:text-blue-400/70 text-sm">
                    × 1.5
                  </div>
                </div>
              </div>

              {/* Tango Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="tango"
                  className="text-lg font-medium text-purple-700 dark:text-purple-300 flex items-center"
                >
                  <Clock className="h-4 w-4 mr-1.5" />
                  Tango Time
                </Label>
                <div className="relative">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Input
                      id="tango"
                      name="tango"
                      type="number"
                      step="0.1"
                      placeholder="Enter Tango time"
                      value={scores.tango}
                      onChange={handleChange}
                      className={`h-12 pl-4 pr-4 border-2 border-purple-300/50 dark:border-purple-700/50 focus:border-purple-500 
                                 dark:focus:border-purple-400 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-sm
                                 text-purple-800 dark:text-purple-200 placeholder:text-purple-400/70 dark:placeholder:text-purple-500/70 ${noSpinnerClass}`}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Zip Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="zip"
                  className="text-lg font-medium text-indigo-700 dark:text-indigo-300 flex items-center"
                >
                  <Clock className="h-4 w-4 mr-1.5" />
                  Zip Time
                </Label>
                <div className="relative">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Input
                      id="zip"
                      name="zip"
                      type="number"
                      step="0.1"
                      placeholder="Enter Zip time"
                      value={scores.zip}
                      onChange={handleChange}
                      className={`h-12 pl-4 pr-4 border-2 border-indigo-300/50 dark:border-indigo-700/50 focus:border-indigo-500 
                                 dark:focus:border-indigo-400 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-sm
                                 text-indigo-800 dark:text-indigo-200 placeholder:text-indigo-400/70 dark:placeholder:text-indigo-500/70 ${noSpinnerClass}`}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Backtracks Input (subfield of Zip) */}
              <div className="space-y-2 ml-8 mt-2">
                <Label
                  htmlFor="backtracks"
                  className="text-lg font-medium text-indigo-600/80 dark:text-indigo-400/80 flex items-center"
                >
                  Backtracks
                </Label>
                <div className="relative">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Input
                      id="backtracks"
                      name="backtracks"
                      type="number"
                      placeholder="Enter backtracks count"
                      value={scores.backtracks}
                      onChange={handleChange}
                      className={`h-12 pl-4 pr-12 border-2 border-indigo-300/30 dark:border-indigo-700/30 focus:border-indigo-500 
                                dark:focus:border-indigo-400 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-sm
                                text-indigo-800 dark:text-indigo-200 placeholder:text-indigo-400/70 dark:placeholder:text-indigo-500/70 ${noSpinnerClass}`}
                    />
                  </motion.div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500/70 dark:text-indigo-400/70 text-sm">
                    × 3
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <motion.div
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className="pt-4"
              >
                <Button
                  onClick={calculateScore}
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                            hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl 
                            transition-all duration-300 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    "Calculate Total Score"
                  )}
                </Button>
              </motion.div>

              {/* Results */}
              {calculatedScore !== null && !isLoading && formulaBreakdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                            border border-blue-300/30 dark:border-blue-700/30 backdrop-blur-sm"
                >
                  <p className="text-center font-medium text-lg text-blue-800 dark:text-blue-200">
                    Your score was:
                    <span
                      className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r 
                                    from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300"
                    >
                      {calculatedScore}
                    </span>
                  </p>

                  <div className="mt-4 font-mono text-center">
                    <div className="flex justify-center items-end space-x-2 text-sm">
                      <div className="flex flex-col items-center">
                        <span className="text-blue-800 dark:text-blue-200">{formulaBreakdown.queensPart}</span>
                        <span className="text-xs text-blue-600/60 dark:text-blue-400/60 mt-1">Queens</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">+</span>
                      <div className="flex flex-col items-center">
                        <span className="text-purple-800 dark:text-purple-200">{formulaBreakdown.tangoPart}</span>
                        <span className="text-xs text-purple-600/60 dark:text-purple-400/60 mt-1">Tango</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">+</span>
                      <div className="flex flex-col items-center">
                        <span className="text-indigo-800 dark:text-indigo-200">{formulaBreakdown.zipPart}</span>
                        <span className="text-xs text-indigo-600/60 dark:text-indigo-400/60 mt-1">Zip</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">+</span>
                      <div className="flex flex-col items-center">
                        <span className="text-indigo-800/80 dark:text-indigo-200/80">
                          {formulaBreakdown.backtracksPart}
                        </span>
                        <span className="text-xs text-indigo-600/50 dark:text-indigo-400/50 mt-1">Backtracks</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">=</span>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-blue-800 dark:text-blue-200">{formulaBreakdown.total}</span>
                        <span className="text-xs text-blue-600/60 dark:text-blue-400/60 mt-1">Total</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

