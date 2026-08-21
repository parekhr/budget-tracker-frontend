import { type Budget } from "../api/budgets";
import { CategoryPicker } from "./CategoryPicker";
import { useState } from "react";
import { createBudget } from "../api/budgets";

type BudgetFormProps = {
    budget?: Budget | null;
    budgets: Budget[];
    currentMonth: string;
    onCreate: (budget: Budget) => void;
    onUpdate: (budget: Budget) => void;
};

export function BudgetForm({ budget, budgets, currentMonth, onCreate, onUpdate }: BudgetFormProps) {
    const [categoryId, setCategoryId] = useState<number | "">(budget ? budget.categoryId : "");
    const [month, setMonth] = useState<string>(budget ? budget.month : currentMonth);
    const [limitAmount, setLimitAmount] = useState<string>(budget ? budget.limitAmount.toString() : "");
    const [submitted, setSubmitted] = useState(false);
    const isValidLimitAmount = /^\d+(\.\d{1,2})?$/.test(limitAmount);
    const isValidMonth = month !== "";
    const isValidCategory = categoryId !== "";

    return (
        <div className="max-w-sm">
            <h1 className="text-xl font-bold text-white mb-4">
                {budget ? "Update Budget" : "Add a Budget"}
            </h1>
            <form
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    if (!isValidMonth || !isValidCategory || !isValidLimitAmount || limitAmount === "") return;

                    if (budget) {
                        // `b.id !== budget.id` excludes the budget being edited itself — otherwise
                        // saving it unchanged would always "match" its own month/category and
                        // falsely look like a duplicate.
                        if (budgets.some(b => b.id !== budget.id && b.month === month && b.categoryId === categoryId)) {
                            alert("A budget for this month and category already exists.");
                        } else {
                            onUpdate({ ...budget, month, limitAmount: Number(limitAmount), categoryId });
                        }
                    } else if (budgets.some(b => b.month === month && b.categoryId === categoryId)) {
                        // Creating new — no self to exclude, so check the whole list for a conflict.
                        alert("A budget for this month and category already exists.");
                    } else {
                        createBudget({ month, limitAmount: Number(limitAmount), categoryId, userId: 1 }).then(newBudget => {
                            onCreate(newBudget);
                        });
                    }

                    setSubmitted(false);
                }}
            >
                <label className="text-gray-400 text-sm">Month</label>
                <input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Month"
                    className={`border rounded px-3 py-2 bg-neutral-800 text-white placeholder-gray-500 ${!submitted || isValidMonth ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !isValidMonth && (
                    <p className="text-red-400 text-sm">Please select a month</p>
                )}
                <label className="text-gray-400 text-sm">Limit Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        className={`border rounded px-3 py-2 pl-7 w-full bg-neutral-800 text-white placeholder-gray-500 ${!submitted || isValidLimitAmount ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                        value={limitAmount}
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => setLimitAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
                {submitted && !isValidLimitAmount && (
                    <p className="text-red-400 text-sm">Please enter a valid dollar amount</p>
                )}
                <label className="text-gray-400 text-sm">Category</label>
                <CategoryPicker value={categoryId} onChange={setCategoryId} />
                {submitted && !isValidCategory && (
                    <p className="text-red-400 text-sm">Please select a category</p>
                )}
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                >
                    {budget ? "Update Budget" : "Create Budget"}
                </button>
            </form>
        </div>
    )
}
