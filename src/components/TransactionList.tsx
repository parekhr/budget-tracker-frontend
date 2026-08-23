import { useState } from "react";
import { type Transaction } from "../api/transactions";
import { type Category } from "../api/categories";
import { getCategoryColorStyle } from "../utils/categoryColors";
import { Pencil, Trash2 } from "lucide-react"

export interface TransactionListProps {
    transactions: Transaction[]
    categories: Category[]
    onEdit?: (t: Transaction) => void
    onDelete?: (id: number) => void
    limit?: number
}

// e.g. src/utils/formatDate.ts, alongside categoryColors.ts
export function formatDate(isoDate: string): string {
    const date = new Date(isoDate + "T00:00:00"); // avoid UTC-shift off-by-one
    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? "st"
        : day % 10 === 2 && day !== 12 ? "nd"
        : day % 10 === 3 && day !== 13 ? "rd"
        : "th";
    const month = date.toLocaleDateString(undefined, { month: "long" });
    return `${month} ${day}${suffix}, ${date.getFullYear()}`;
}

export function TransactionList({ transactions, categories, onEdit, onDelete, limit }: TransactionListProps) {
    const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);
    const sortedTransactions = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
    const visibleTransactions = limit ? sortedTransactions.slice(0, limit) : sortedTransactions;
    return (
        <div className="flex flex-col gap-2">
            {visibleTransactions.map(transaction => {
                const category = categories.find(c => c.id === transaction.categoryId);
                return (
                    <div key={transaction.id} className="flex justify-between items-center bg-neutral-900 border border-white/10 rounded-xl px-4 py-3">
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-white">{transaction.title}</span>
                            {category && (
                                <span className="px-2 py-0.5 rounded-full text-xs" style={getCategoryColorStyle(category.color)}>
                                    {category.name}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            {(onEdit || onDelete) && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit?.(transaction)}
                                        className="h-6 px-1 flex items-center justify-center rounded cursor-pointer hover:bg-white/10"
                                        aria-label="Edit Transaction"
                                    >
                                        <Pencil size={14} className="text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirmingDeleteId === transaction.id) {
                                                onDelete?.(transaction.id);
                                                setConfirmingDeleteId(null);
                                            } else {
                                                setConfirmingDeleteId(transaction.id);
                                            }
                                        }}
                                        onBlur={() => setConfirmingDeleteId(null)}
                                        className={`h-6 flex items-center justify-center rounded cursor-pointer ${confirmingDeleteId === transaction.id ? "px-2 bg-red-500/20 hover:bg-red-500/30" : "px-1 hover:bg-white/10"}`}
                                        aria-label={confirmingDeleteId === transaction.id ? "Confirm delete transaction" : "Delete Transaction"}
                                    >
                                        {confirmingDeleteId === transaction.id ? (
                                            <span className="text-red-400 text-xs font-medium leading-none">Confirm?</span>
                                        ) : (
                                            <Trash2 size={14} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            )}
                            <span className="text-red-400 font-medium">${transaction.amount}</span>
                            <span className="text-sm text-gray-400">{formatDate(transaction.date)}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}