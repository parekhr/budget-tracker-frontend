import { useState } from "react";
import { createTransaction, type Transaction } from "../api/transactions";
import { CategoryPicker } from "./CategoryPicker";

type TransactionFormProps = {
    transaction?: Transaction | null;
    onCreate: (transaction: Transaction) => void;
    onUpdate: (transaction: Transaction) => void;
};

export function TransactionForm({ transaction, onCreate, onUpdate }: TransactionFormProps) {

    const [amount, setAmount] = useState<string>(transaction ? transaction.amount.toString() : "");
    const [date, setDate] = useState<string>(transaction ? transaction.date : "");
    const [title, setTitle] = useState<string>(transaction ? transaction.title : "");
    const [categoryId, setCategoryId] = useState<number | "">(transaction ? transaction.categoryId : "");
    const [submitted, setSubmitted] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState<string>(transaction ? transaction?.additionalNotes ?? "" : "");
    const isValidAmount = /^\d+(\.\d{1,2})?$/.test(amount);
    const isValidDate = date !== "";
    const isValidCategory = categoryId !== "";
    const isValidTitle = title.trim() !== "";

    return (
        <div className="max-w-sm">
            <h1 className="text-xl font-bold text-white mb-4">
                {transaction ? "Update Transaction" : "Add a Transaction"}
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    if (categoryId === "") return;
                    if (!isValidAmount || amount === "" || !isValidDate || !isValidCategory || !isValidTitle) return;
                    if (transaction) {
                        onUpdate({ ...transaction, amount: Number(amount), date, title, categoryId, additionalNotes });
                    } else {
                        createTransaction({ amount: Number(amount), date, title, categoryId, userId: 1, additionalNotes }).then(newTransaction => {
                            onCreate(newTransaction);
                            setTitle("");
                            setAmount("");
                            setDate("");
                            setCategoryId("");
                            setAdditionalNotes("");
                        });
                    }

                    setSubmitted(false);
                }}
                className="flex flex-col gap-3"
            >
                <label className="text-gray-400 text-sm">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={`border rounded px-3 py-2 bg-neutral-800 text-white placeholder-gray-500 ${!submitted || isValidTitle ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !isValidTitle && (
                    <p className="text-red-400 text-sm">Please enter a title</p>
                )}
                <label className="text-gray-400 text-sm">Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        className={`border rounded px-3 py-2 pl-7 w-full bg-neutral-800 text-white placeholder-gray-500 ${!submitted || isValidAmount ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                        value={amount}
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
                {submitted && !isValidAmount && (
                    <p className="text-red-400 text-sm">Please enter a valid dollar amount</p>
                )}
                <label className="text-gray-400 text-sm">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`border rounded px-3 py-2 bg-neutral-800 text-white ${!submitted || isValidDate ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !isValidDate && (
                    <p className="text-red-400 text-sm">Please select a date</p>
                )}
                <label className="text-gray-400 text-sm">Category</label>
                <CategoryPicker value={categoryId} onChange={setCategoryId} />
                {submitted && !isValidCategory && (
                    <p className="text-red-400 text-sm">Please select a category</p>
                )}
                <label className="text-gray-400 text-sm">Additional Notes</label>
                <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Add any additional notes for this transaction..."
                    className="border rounded px-3 py-2 bg-neutral-800 text-white placeholder-gray-500 border-white/10"
                />

                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                >
                    {transaction ? "Update Transaction" : "Create Transaction"}
                </button>
            </form>
        </div>
    )
}
