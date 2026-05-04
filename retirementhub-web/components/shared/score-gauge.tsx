"use client"
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts"
import { scoreLabel } from "@/lib/utils"

interface ScoreGaugeProps {
  score: number
  size?: number
  showLabel?: boolean
}

export function ScoreGauge({ score, size = 180, showLabel = true }: ScoreGaugeProps) {
  const { label, color } = scoreLabel(score)
  const fillColor = score >= 80 ? "#1b6d24" : score >= 60 ? "#000666" : score >= 40 ? "#c19000" : "#ba1a1a"

  const data = [{ name: "score", value: score, fill: fillColor }]

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: size, height: size }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            startAngle={225}
            endAngle={-45}
            data={data}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: "#eeeef0" }}
              dataKey="value"
              cornerRadius={8}
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-on-surface">{score}</span>
          <span className="text-xs text-on-surface-dim font-medium">/ 100</span>
        </div>
      </div>
      {showLabel && (
        <div className="text-center">
          <span className={`text-base font-bold ${color}`}>{label}</span>
        </div>
      )}
    </div>
  )
}
