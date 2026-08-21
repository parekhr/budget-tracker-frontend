import type { CategoryBreakdown as CategoryBreakdownData } from "../api/summary"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type CategoryBreakdownProps = {
    data: CategoryBreakdownData[]
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
    return (
        <div className="flex flex-col gap-2">
            <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data} maxBarSize={50}>
                    <XAxis dataKey="categoryName" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" interval={0} />
                    <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.08)" }}
                        contentStyle={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                        labelStyle={{ color: "#ffffff" }}
                        itemStyle={{ color: "#ffffff" }}
                    />
                    <Bar
                        dataKey="amount"
                        isAnimationActive={false}
                        shape={(props: any) => (
                            <rect
                                x={props.x}
                                y={props.y}
                                width={props.width}
                                height={props.height}
                                fill={props.payload.color}
                            />
                        )}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
