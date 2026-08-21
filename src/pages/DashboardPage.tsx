import { getTransactions, type Transaction } from "../api/transactions"
import { SummaryCards } from "../components/SummaryCards"
import { getSummary, type Summary } from "../api/summary"
import { useEffect, useState } from "react"
import { CategoryBreakdown } from "../components/CategoryBreakdown"

export function DashboardPage() {

    const [summary, setSummary] = useState<Summary | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7)) // Get current month in YYYY-MM format

    useEffect(() => {
        getSummary(month).then(setSummary)
    }, [month])

    useEffect(() => {
        getTransactions().then(setTransactions)
    }, [])

    return (
        <div className="min-h-screen bg-black p-6">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
            <h3 className="text-md font-bold text-white mb-4">
                {(() => {
                    const [year, monthNum] = month.split("-").map(Number);
                    return new Date(year, monthNum - 1, 1).toLocaleString(undefined, { month: "long", year: "numeric" });
                })()}
            </h3>
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
                    <h2 className="text-white font-semibold mb-4">Spending by category</h2>
                    <CategoryBreakdown data={summary?.spendByCategory ?? []} />    
                </div>
                {/* SpendingTrend card goes here later */}
            </div>
        </div>
    )
}