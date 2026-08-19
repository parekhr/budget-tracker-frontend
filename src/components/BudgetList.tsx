import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { type Budget } from "../api/budgets";
import type { Category } from "../api/categories";
import type { Transaction } from "../api/transactions";
import { getCategoryColorStyle } from "../utils/categoryColors";

interface BudgetListProps {
    budgets: Budget[];
    categories: Category[];
    onEdit: (budget: Budget) => void;
    transactions: Transaction[];
    onDelete: (id: number) => void;
}



export function BudgetList({ budgets, categories, transactions, onEdit, onDelete }: BudgetListProps) {
    const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-2">
            {budgets.map((budget) => {
                const category = categories.find(c => c.id === budget.categoryId);

                const spent = transactions
                .filter(t => t.categoryId === budget.categoryId && t.date.startsWith(budget.month))
                .reduce((sum, t) => sum + t.amount, 0);

                const percentage = Math.round((spent / budget.limitAmount) * 100);
                const barColor = percentage >= 90 ? "bg-red-600" : percentage >= 50 ? "bg-yellow-600" : "bg-green-600";
                const warningColor = percentage >= 90 ? "text-red-400" : "text-yellow-400";

                return (
                    <div
                        key={budget.id}
                        className="flex flex-col gap-2 border border-white/10 rounded-xl px-4 py-3"
                        style={getCategoryColorStyle(category?.color || "")}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{category?.name}</span>
                                <span className="text-sm text-gray-400">{percentage}%</span>
                                {percentage >= 50 && (
                                    <AlertTriangle size={14} className={warningColor} aria-label="Approaching or over budget" />
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(budget)}
                                        className="h-6 px-1 flex items-center justify-center rounded cursor-pointer hover:bg-white/10"
                                        aria-label="Edit Budget"
                                    >
                                        <Pencil size={14} className="text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirmingDeleteId === budget.id) {
                                                onDelete(budget.id);
                                                setConfirmingDeleteId(null);
                                            } else {
                                                setConfirmingDeleteId(budget.id);
                                            }
                                        }}
                                        onBlur={() => setConfirmingDeleteId(null)}
                                        className={`h-6 flex items-center justify-center rounded cursor-pointer ${confirmingDeleteId === budget.id ? "px-2 bg-red-500/20 hover:bg-red-500/30" : "px-1 hover:bg-white/10"}`}
                                        aria-label={confirmingDeleteId === budget.id ? "Confirm delete budget" : "Delete Budget"}
                                    >
                                        {confirmingDeleteId === budget.id ? (
                                            <span className="text-red-400 text-xs font-medium leading-none">Confirm?</span>
                                        ) : (
                                            <Trash2 size={14} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                <span className="text-gray-200">
                                    ${spent.toFixed(2)} / ${budget.limitAmount} <span className="text-xs">limit</span>
                                </span>
                            </div>
                        </div>
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${barColor}`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
