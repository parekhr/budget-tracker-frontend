import { getTransactions, type Transaction } from "../api/transactions";
import { TransactionList } from "../components/TransactionList"
import { TransactionForm } from "../components/TransactionForm"
import { Modal } from "../components/Modal"
import { useEffect, useState } from "react"

export function TransactionsPage() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

    return (
        <div>
            <h1>Transaction Page</h1>
            <TransactionList transactions={transactions} />
            <button
                onClick={() => setModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300"
            >
                Add Transaction
            </button>
            {modal && (
                <Modal onClose={() => setModal(false)}>
                    <TransactionForm onCreate={(newTransaction) => {
                        setTransactions([...transactions, newTransaction]);
                        setModal(false);
                    }} />
                </Modal>
            )}
        </div>
    )
}