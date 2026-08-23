import { getTransactions, type Transaction } from "../api/transactions"
import { SummaryCards } from "../components/SummaryCards"
import { getSummary, type Summary, type TrendPoint, getTrends } from "../api/summary"
import { useEffect, useState } from "react"
import { CategoryBreakdown } from "../components/CategoryBreakdown"
import { SpendingTrend } from "../components/SpendingTrend"
import { BudgetProgressList } from "../components/BudgetProgressList"
import { TransactionList } from "../components/TransactionList"
import { getCategories, type Category } from "../api/categories"

const CURRENT_MONTH = new Date().toISOString().slice(0, 7) // "YYYY-MM"

export function DashboardPage() {

    const [summary, setSummary] = useState<Summary | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [month, setMonth] = useState<string>(CURRENT_MONTH)
    const [trends, setTrends] = useState<TrendPoint[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const isCurrentMonth = month === CURRENT_MONTH

    useEffect(() => {
        getSummary(month).then(setSummary)
    }, [month])

    useEffect(() => {
        getTransactions().then(setTransactions)
    }, [])

    useEffect(() => {
        getTrends(8).then(setTrends)
    }, [])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <div className="min-h-screen bg-black p-6">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
            <div className="flex items-center gap-3 text-gray-400 mb-4">
                <button
                    className="cursor-pointer hover:text-white text-xl px-2"
                    onClick={() => {
                        const [year, monthNum] = month.split("-").map(Number);
                        const prevMonth = monthNum === 1 ? 12 : monthNum - 1;
                        const prevYear = monthNum === 1 ? year - 1 : year;
                        setMonth(`${prevYear}-${prevMonth.toString().padStart(2, "0")}`);
                    }}
                >
                    {"<"}
                </button>
                <h3 className="text-md font-bold text-white w-40 text-center">
                    {(() => {
                        const [year, monthNum] = month.split("-").map(Number);
                        return new Date(year, monthNum - 1, 1).toLocaleString(undefined, { month: "long", year: "numeric" });
                    })()}
                </h3>
                <button
                    className={`text-xl px-2 ${isCurrentMonth ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:text-white"}`}
                    disabled={isCurrentMonth}
                    onClick={() => {
                        if (isCurrentMonth) return;
                        const [year, monthNum] = month.split("-").map(Number);
                        const nextMonth = monthNum === 12 ? 1 : monthNum + 1;
                        const nextYear = monthNum === 12 ? year + 1 : year;
                        setMonth(`${nextYear}-${nextMonth.toString().padStart(2, "0")}`);
                    }}
                >
                    {">"}
                </button>
            </div>
            {summary && (
                <SummaryCards
                    totalSpent={summary.totalSpent}
                    budgeted={summary.budgeted}
                    remaining={summary.remaining}
                    transactionCount={transactions.filter(t => t.date.slice(0, 7) === month).length}
                />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <div className="bg-neutral-900 border border-white/10 rounded-xl p-4">
                    <h2 className="text-white font-semibold mb-4 text-center">Spending by category</h2>
                    <CategoryBreakdown data={summary?.spendByCategory ?? []} />    
                </div>
                <div className="bg-neutral-900 border border-white/10 rounded-xl p-4">
                    <h2 className="text-white font-semibold mb-4 text-center">Spending trend</h2>
                    <SpendingTrend data={trends} />
                </div>
            </div>
                <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 mt-4">
                    <h2 className="text-white font-semibold mb-4 text-center">Budget progress</h2>
                    <BudgetProgressList budgetVsActual={summary?.budgetVsActual ?? []} />
                </div>
                <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 mt-4">
                    
                    <h2 className="text-white font-semibold mb-4 text-center">Recent Transactions</h2>
                    <TransactionList
                        transactions={transactions.filter(t => t.date.slice(0, 7) === month)}
                        categories={categories}
                        limit={5}
                        //read-only, no edit or delete actions provided
                    />
                </div>
        </div>
    )
}