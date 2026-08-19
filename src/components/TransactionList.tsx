import { useState } from "react";
import { type Transaction } from "../api/transactions";
import { type Category } from "../api/categories";
import { getCategoryColorStyle } from "../utils/categoryColors";
import { Pencil, Trash2 } from "lucide-react"

export interface TransactionListProps {
    transactions: Transaction[]
    categories: Category[]
    onEdit: (t: Transaction) => void
    onDelete: (id: number) => void
}

export function TransactionList({ transactions, categories, onEdit, onDelete }: TransactionListProps) {
    const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-2">
            {transactions.map(transaction => {
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
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onEdit(transaction)}
                                    className="h-6 px-1 flex items-center justify-center rounded cursor-pointer hover:bg-white/10"
                                    aria-label="Edit Transaction"
                                >
                                    <Pencil size={14} className="text-gray-400" />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirmingDeleteId === transaction.id) {
                                            onDelete(transaction.id);
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
                            <span className="text-red-400 font-medium">${transaction.amount}</span>
                            <span className="text-sm text-gray-400">{transaction.date}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}