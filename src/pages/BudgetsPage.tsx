import { getBudgets, deleteBudget, updateBudget, type Budget } from "../api/budgets";
import { BudgetList } from "../components/BudgetList";
import { BudgetForm } from "../components/BudgetForm";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { getCategories, type Category } from "../api/categories";
import { getTransactions, type Transaction } from "../api/transactions";

export function BudgetsPage() {
    const [modal, setModal] = useState(false);

    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        getBudgets().then(setBudgets);
    }, []);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

    function handleDeleteBudget(id: number) {
        deleteBudget(id).then(() => {
            setBudgets(prev => prev.filter(b => b.id !== id));
        });
    }

    function handleEditBudget(updatedBudget: Budget) {
        updateBudget(updatedBudget).then((newBudget) => {
            setBudgets(prev => prev.map(b => b.id === newBudget.id ? newBudget : b));
        });
    }

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="flex items-center justify-center gap-3 text-gray-400 mb-2">
                <button className="cursor-pointer hover:text-white">{"<"}</button>
                <span className="text-white font-medium">August 2026</span>
                <button className="cursor-pointer hover:text-white">{">"}</button>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Budgets Page</h1>
                    <button
                        onClick={() => {
                            // Logic to open a modal or navigate to a budget creation page
                            setModal(true);
                            setEditingBudget(null);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                    >
                        + Add Budget
                    </button>
                </div>
                <BudgetList
                    budgets={budgets}
                    categories={categories}
                    transactions={transactions}
                    onEdit={(budget) => {
                        setModal(true);
                        setEditingBudget(budget);
                    }}
                    onDelete={handleDeleteBudget}
                />
            </div>
            {modal && (
                <Modal onClose={() => setModal(false)}>
                    <BudgetForm
                        budget={editingBudget}
                        onCreate={(newBudget) => {
                            setBudgets(prev => [...prev, newBudget]);
                            setModal(false);
                        }}
                        onUpdate={(updatedBudget) => {
                            handleEditBudget(updatedBudget);
                            setModal(false);
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}