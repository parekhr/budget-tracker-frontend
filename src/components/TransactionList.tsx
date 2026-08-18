import { type Transaction } from "../api/transactions";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {

    return (
        <div>
            {transactions.map(transaction => (
                <div key={transaction.id}>
                    {transaction.note} - ${transaction.amount}
                </div>
            ))}
        </div>
    )
}