import { type Transaction } from "../api/transactions";
import { type Category } from "../api/categories";

export function TransactionList({ transactions, categories }: { transactions: Transaction[], categories: Category[] }) {
    return (
    <div className="flex flex-col gap-2">
        {transactions.map(transaction => {
            const category = categories.find(c => c.id === transaction.categoryId);
            return (
                <div key={transaction.id} className="flex justify-between items-center bg-neutral-900 border border-white/10 rounded-xl px-4 py-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-white">{transaction.note}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            {category && (
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                                    {category.name}
                                </span>
                            )}
                            <span>{transaction.date}</span>
                        </div>
                    </div>
                    <span className="text-red-400 font-medium">-${transaction.amount}</span>
                </div>
            );
        })}
    </div>
    )
}