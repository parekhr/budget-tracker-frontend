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
    const [currentMonth, setCurrentMonth] = useState<string>("2026-08"); // "YYYY-MM", same format as Budget.month

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
                <button
                    className="cursor-pointer hover:text-white text-xl px-2"
                    onClick={() => {
                        const [year, month] = currentMonth.split("-").map(Number);
                        // Jan rolls back to Dec of the previous year
                        const prevMonth = month === 1 ? 12 : month - 1;
                        const prevYear = month === 1 ? year - 1 : year;
                        setCurrentMonth(`${prevYear}-${prevMonth.toString().padStart(2, "0")}`);
                    }}
                >
                    {"<"}
                </button>
                {/* w-40 keeps this a fixed width so the arrows don't shift left/right as the label's length changes (e.g. "May" vs "September") */}
                <span className="text-white font-medium w-40 text-center">
                    {(() => {
                        const [year, month] = currentMonth.split("-").map(Number);
                        // Built from numeric year/month (not `new Date("2026-08-01")`) so this
                        // constructs in local time — parsing a date-only string treats it as UTC
                        // midnight, which can roll back a day (and month) once toLocaleDateString
                        // renders it in a timezone behind UTC.
                        return new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
                    })()}
                </span>
                <button
                    className="cursor-pointer hover:text-white text-xl px-2"
                    onClick={() => {
                        const [year, month] = currentMonth.split("-").map(Number);
                        // Dec rolls forward to Jan of the next year
                        const nextMonth = month === 12 ? 1 : month + 1;
                        const nextYear = month === 12 ? year + 1 : year;
                        setCurrentMonth(`${nextYear}-${nextMonth.toString().padStart(2, "0")}`);
                    }}
                >
                    {">"}
                </button>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Budgets</h1>
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
                    budgets={budgets.filter(b => b.month === currentMonth)}
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
                        budgets={budgets}
                        currentMonth={currentMonth}
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