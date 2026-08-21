import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts"
import type { TrendPoint } from "../api/summary"

function formatMonth(period: string, style: "short" | "long" = "short") {
    const [year, monthNum] = period.split("-").map(Number)
    return new Date(year, monthNum - 1, 1).toLocaleString(undefined, { month: style })
}

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload || !payload.length) return null

    return (
        <div style={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 10 }}>
            <p style={{ margin: 0, color: "#ffffff" }}>
                {formatMonth(label, "long")}: ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
    )
}

export function SpendingTrend({ data }: { data: TrendPoint[] }) {
    return (
        <div className="flex flex-col gap-2">
            <ResponsiveContainer width="100%" height={180}>
                <LineChart data={data}>
                    <XAxis dataKey="period" stroke="#9ca3af" interval={0} tickFormatter={(value: string) => formatMonth(value)} />
                    <YAxis stroke="#9ca3af" interval={0} tickFormatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Tooltip cursor={false} content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="totalSpent" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
