"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"

type Scaling = "standard" | "off"
type Encoding = "onehot" | "ordinal"
type Model = "logreg" | "rf" | "gb"

const STAGES = ["Data", "Impute", "Encode", "Scale", "Model", "Evaluate", "Export"]

interface Metrics {
  accuracy: number
  latency: number
  trainTime: number
}

function calculateMetrics(scaling: Scaling, encoding: Encoding, model: Model): Metrics {
  let baseAccuracy = 82

  if (scaling === "standard") baseAccuracy += 3
  if (encoding === "onehot") baseAccuracy += 2
  if (model === "gb") baseAccuracy += 4
  else if (model === "rf") baseAccuracy += 2

  let baseLatency = 15
  if (scaling === "standard") baseLatency += 2
  if (model === "gb") baseLatency += 8
  else if (model === "rf") baseLatency += 3

  let baseTrainTime = 5
  if (model === "gb") baseTrainTime += 6
  else if (model === "rf") baseTrainTime += 3

  return {
    accuracy: Math.min(baseAccuracy, 99),
    latency: baseLatency,
    trainTime: baseTrainTime,
  }
}

export default function PipelineBuilder() {
  const [scaling, setScaling] = useState<Scaling>("standard")
  const [encoding, setEncoding] = useState<Encoding>("onehot")
  const [model, setModel] = useState<Model>("logreg")

  const metrics = useMemo(() => calculateMetrics(scaling, encoding, model), [scaling, encoding, model])

  const accuracyColor =
    metrics.accuracy > 85 ? "text-green-400" : metrics.accuracy > 75 ? "text-amber-400" : "text-red-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="bg-[#111111] border border-white/10 rounded-2xl p-7 space-y-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-white">ML Pipeline Simulator</h3>

      {/* Controls */}
      <div className="space-y-4">
        {/* Scaling */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/70 uppercase">Scaling</label>
          <div className="flex gap-2">
            {(["standard", "off"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setScaling(value)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  scaling === value
                    ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-400"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {value === "standard" ? "Standard" : "Off"}
              </button>
            ))}
          </div>
        </div>

        {/* Encoding */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/70 uppercase">Encoding</label>
          <div className="flex gap-2">
            {(["onehot", "ordinal"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setEncoding(value)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  encoding === value
                    ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-400"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {value === "onehot" ? "One-Hot" : "Ordinal"}
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/70 uppercase">Model</label>
          <div className="flex gap-2">
            {(["logreg", "rf", "gb"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setModel(value)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  model === value
                    ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-400"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {value === "logreg" ? "LogReg" : value === "rf" ? "RF" : "GB"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-white/70 uppercase">Pipeline Flow</label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {STAGES.map((stage, i) => (
            <div key={stage} className="flex items-center gap-2 flex-shrink-0">
              <motion.div
                animate={{
                  boxShadow:
                    ["Data", "Encode", "Scale", "Model"].includes(stage) || stage === "Evaluate"
                      ? "0 0 10px rgba(34, 211, 238, 0.5)"
                      : "none",
                }}
                transition={{ duration: 0.3 }}
                className={`px-3 py-2 rounded-lg font-mono text-xs font-semibold whitespace-nowrap ${
                  ["Data", "Encode", "Scale", "Model"].includes(stage) || stage === "Evaluate"
                    ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-400"
                    : "bg-white/5 border border-white/20 text-white/60"
                }`}
              >
                {stage}
              </motion.div>
              {i < STAGES.length - 1 && (
                <motion.div
                  animate={{ backgroundPosition: ["0% 0", "100% 0"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-px bg-gradient-to-r from-white/20 via-cyan-400/50 to-white/20 flex-shrink-0"
                  style={{ backgroundSize: "200% 100%" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <motion.div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
        {[
          { label: "Accuracy", value: `${metrics.accuracy.toFixed(1)}%`, color: accuracyColor },
          { label: "Latency", value: `${metrics.latency.toFixed(1)}ms`, color: "text-white" },
          { label: "Train Time", value: `${metrics.trainTime.toFixed(1)}s`, color: "text-white" },
        ].map((metric) => (
          <motion.div key={metric.label} className="text-center">
            <div className="text-[10px] font-semibold text-white/50 uppercase">{metric.label}</div>
            <motion.div
              key={`${metric.label}-${metric.value}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-lg font-bold ${metric.color} mt-1 font-mono`}
            >
              {metric.value}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-[10px] text-white/40 italic">Simulated estimates — illustrative of real-world tradeoffs.</p>
    </motion.div>
  )
}
