import { deleteTransaction, getTransactions, updateTransaction, type Transaction } from "../api/transactions";
import { getCategories, type Category } from "../api/categories";
import { TransactionList } from "../components/TransactionList"
import { TransactionForm } from "../components/TransactionForm"
import { Modal } from "../components/Modal"
import { useEffect, useState } from "react"


export function TransactionsPage() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modal, setModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        getTransactions().then(setTransactions);
        getCategories().then(setCategories);
    }, []);

    function handleDeleteTransaction(id: number) {
        deleteTransaction(id).then(() => {
            setTransactions(prev => prev.filter(t => t.id !== id));
        });
    }

    function handleEditTransaction(updatedTransaction: Transaction) {
        updateTransaction(updatedTransaction).then((newTransaction) => {
            setTransactions(prev => prev.map(t => t.id === newTransaction.id ? newTransaction : t));
        });
    }

    function handleStartEditTransaction(transaction: Transaction) {
        setModal(true);
        setEditingTransaction(transaction);
    }

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Transaction</h1>
                    <button
                        onClick={() => { 
                            setEditingTransaction(null); 
                            setModal(true); 
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                    >
                        + Add Transaction
                    </button>
                </div>
                <TransactionList
                    transactions={transactions}
                    categories={categories}
                    onEdit={handleStartEditTransaction}
                    onDelete={handleDeleteTransaction}
                />
            </div>
            {modal && (
                <Modal onClose={() => setModal(false)}>
                    <TransactionForm
                        transaction={editingTransaction}
                        onCreate={(newTransaction) => {
                            setTransactions(prev => [...prev, newTransaction]);
                            setModal(false);
                        }}
                        onUpdate={(updatedTransaction) => {
                            handleEditTransaction(updatedTransaction);
                            setModal(false);
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}