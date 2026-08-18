import { useEffect, useState } from "react";
import { getTransactions, type Transaction } from "../api/transactions";

export function TransactionList() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

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