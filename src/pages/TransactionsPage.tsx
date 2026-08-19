import { getTransactions, type Transaction } from "../api/transactions";
import { getCategories, type Category } from "../api/categories";
import { TransactionList } from "../components/TransactionList"
import { TransactionForm } from "../components/TransactionForm"
import { Modal } from "../components/Modal"
import { useEffect, useState } from "react"

export function TransactionsPage() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getTransactions().then(setTransactions);
        getCategories().then(setCategories);
    }, []);

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Transaction Page</h1>
                    <button
                        onClick={() => setModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                    >
                        + Add Transaction
                    </button>
                </div>
                <TransactionList transactions={transactions} categories={categories} />
            </div>
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