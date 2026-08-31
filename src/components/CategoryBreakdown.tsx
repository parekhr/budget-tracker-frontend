import { useState } from "react"
import type { CategoryBreakdown as CategoryBreakdownData } from "../api/summary"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { formatAxisCurrency } from "../utils/currency"

type CategoryBreakdownProps = {
    data: CategoryBreakdownData[]
}

type ChartDatum = CategoryBreakdownData & { otherItems?: CategoryBreakdownData[] }

const MAX_CATEGORIES = 5

function toChartData(data: CategoryBreakdownData[]): ChartDatum[] {
    if (data.length <= MAX_CATEGORIES) return data

    const sorted = [...data].sort((a, b) => b.amount - a.amount)
    const top = sorted.slice(0, MAX_CATEGORIES)
    const rest = sorted.slice(MAX_CATEGORIES)
    const otherAmount = rest.reduce((sum, item) => sum + item.amount, 0)

    return [...top, { categoryId: -1, categoryName: "Other", color: "#6b7280", amount: otherAmount, otherItems: rest }]
}

function ChartTooltip({ active, payload }: any) {
    if (!active || !payload || !payload.length) return null
    const item: ChartDatum = payload[0].payload

    return (
        <div style={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 10 }}>
            {item.otherItems ? (
                <>
                    <p style={{ margin: 0, marginBottom: 4, color: "#ffffff", fontWeight: 600 }}>Other</p>
                    {item.otherItems.map((sub) => (
                        <p key={sub.categoryId} style={{ margin: 0, color: "#d1d5db" }}>
                            {sub.categoryName}: ${sub.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    ))}
                </>
            ) : (
                <p style={{ margin: 0, color: "#ffffff" }}>
                    {item.categoryName}: ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            )}
        </div>
    )
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const chartData = toChartData(data)
    const isEmpty = chartData.length === 0
    const displayData: ChartDatum[] = isEmpty
        ? [{ categoryId: -2, categoryName: "", color: "transparent", amount: 0 }]
        : chartData

    return (
        <div className="flex flex-col gap-2">
            <div className="relative">
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={displayData} maxBarSize={50}>
                        <XAxis dataKey="categoryName" tick={false} tickLine={false} stroke="#9ca3af" />
                        <YAxis
                            stroke="#9ca3af"
                            interval={0}
                            width={80}
                            domain={isEmpty ? [0, 100] : undefined}
                            tickFormatter={formatAxisCurrency}
                        />
                        <Tooltip cursor={false} content={isEmpty ? () => null : <ChartTooltip />} />
                        <Bar
                            dataKey="amount"
                            isAnimationActive={false}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            shape={(props: any) => (
                                <rect
                                    x={props.x}
                                    y={props.y}
                                    width={props.width}
                                    height={props.height}
                                    fill={props.payload.color}
                                    fillOpacity={props.index === activeIndex ? 0.7 : 1}
                                />
                            )}
                        />
                    </BarChart>
                </ResponsiveContainer>
                {isEmpty && (
                    <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-center text-sm pointer-events-none">
                        No spending data
                    </p>
                )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
                {chartData.map(item => (
                    <div key={item.categoryId} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-400">{item.categoryName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
