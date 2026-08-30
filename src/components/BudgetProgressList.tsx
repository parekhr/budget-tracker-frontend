import { AlertTriangle } from "lucide-react";
import { type BudgetVsActual } from "../api/summary";

export function BudgetProgressList({ budgetVsActual }: { budgetVsActual: BudgetVsActual[] }) {
    return (
        <div className="flex flex-col gap-2">
            {budgetVsActual.length === 0 ? (
                <p className="text-gray-400 text-center text-sm">No budget progress to show</p>
            ) : (
                budgetVsActual.map(item => {
                    const percentage = Math.round((item.spentAmount / item.limitAmount) * 100);
                    const barColor = percentage >= 90 ? "bg-red-600" : percentage >= 50 ? "bg-yellow-600" : "bg-green-600";
                    const spentColor = percentage >= 90 ? "text-red-400" : percentage >= 50 ? "text-yellow-400" : "text-green-400";
                    const warningColor = percentage >= 90 ? "text-red-400" : "text-yellow-400";

                    return (
                        <div key={item.categoryId} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{item.categoryName}</span>
                                    <span className="text-sm text-gray-400">{percentage}%</span>
                                    {percentage >= 50 && (
                                        <AlertTriangle size={14} className={warningColor} aria-label="Approaching or over budget" />
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {item.spentAmount > item.limitAmount && (
                                        <span className="text-xs text-red-400">
                                            Over limit by ${(item.spentAmount - item.limitAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    )}
                                    <span>
                                        <span className={`font-semibold ${spentColor}`}>${item.spentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        <span className="text-sm text-gray-500"> / ${item.limitAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} limit</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}