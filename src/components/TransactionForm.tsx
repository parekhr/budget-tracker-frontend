import { useState } from "react";
import { createTransaction, type Transaction } from "../api/transactions";
import { CategoryPicker } from "./CategoryPicker";

type TransactionFormProps = {
    onCreate: (transaction: Transaction) => void;
};

export function TransactionForm({ onCreate }: TransactionFormProps) {

    const [amount, setAmount] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number | "">("");
    const [submitted, setSubmitted] = useState(false);
    const isValidAmount = /^\d+(\.\d{1,2})?$/.test(amount);
    const isValidDate = date !== "";
    const isValidCategory = categoryId !== "";

    return (
        <div className="p-4 max-w-sm">
            <h1 className="text-2xl mb-4">Add a Transaction</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    if (categoryId === "") return;
                    if (!isValidAmount || amount === "" || !isValidDate || !isValidCategory) return;

                    createTransaction({ amount: Number(amount), date, note, categoryId, userId: 1 }).then(newTransaction => {
                        onCreate(newTransaction);
                    });

                    setSubmitted(false);
                }}
                className="flex flex-col gap-3"
            >
                <label className="text-gray-700">Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        className={`border rounded px-3 py-2 pl-7 w-full ${!submitted || isValidAmount ? "border-gray-300" : "border-red-500 bg-red-50"}`}
                        value={amount}
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
                {submitted && !isValidAmount && (
                    <p className="text-red-500 text-sm">Please enter a valid dollar amount</p>
                )}
                <label className="text-gray-700">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`border rounded px-3 py-2 ${!submitted || isValidDate ? "border-gray-300" : "border-red-500 bg-red-50"}`}
                />
                {submitted && !isValidDate && (
                    <p className="text-red-500 text-sm">Please select a date</p>
                )}
                <label className="text-gray-700">Category</label>
                <CategoryPicker value={categoryId} onChange={setCategoryId} />
                {submitted && !isValidCategory && (
                    <p className="text-red-500 text-sm">Please select a category</p>
                )}

                <label className="text-gray-700">Additional Notes</label>
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300"
                >
                    Create Transaction
                </button>
            </form>
        </div>
    )
}
