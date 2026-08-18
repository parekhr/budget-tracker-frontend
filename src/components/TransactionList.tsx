import { type Transaction } from "../api/transactions";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {

    return (
    <div className="flex flex-col gap-2">
        {transactions.map(transaction => (
            <div key={transaction.id} className="flex justify-between items-center bg-white border border-gray-200 rounded px-4 py-3">
                <span className="text-gray-900">{transaction.note}</span>
                <span className="text-gray-700 font-medium">${transaction.amount}</span>
            </div>
        ))}
    </div>
)
}