type SummaryCardsProps = {
    totalSpent: number
    budgeted: number
    remaining: number
    transactionCount: number
}

export function SummaryCards({ totalSpent, budgeted, remaining, transactionCount }: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl text-center">
                <h2 className="text-sm font-medium text-gray-400">Total Spent</h2>
                <p className="text-2xl font-bold text-white">${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl text-center">
                <h2 className="text-sm font-medium text-gray-400">Budgeted</h2>
                <p className="text-2xl font-bold text-white">${budgeted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl text-center">
                <h2 className="text-sm font-medium text-gray-400">Remaining</h2>
                <p className="text-2xl font-bold text-white">${remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl text-center">
                <h2 className="text-sm font-medium text-gray-400">Transaction Count</h2>
                <p className="text-2xl font-bold text-white">{transactionCount}</p>
            </div>
        </div>
    )
}