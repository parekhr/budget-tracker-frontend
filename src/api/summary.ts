import { getBudgets } from "./budgets"
import { getTransactions } from "./transactions"
import { getCategories } from "./categories"

export interface Summary {
    totalSpent: number,
    budgeted: number,
    remaining: number,
    spendByCategory: CategoryBreakdown[],
    budgetVsActual: BudgetVsActual[]
}

export interface CategoryBreakdown {
    categoryId: number,
    categoryName: string,
    color: string,
    amount: number
}

export interface BudgetVsActual {
    categoryId: number,
    categoryName: string,
    limitAmount: number,
    spentAmount: number
}

export interface TrendPoint {
    period: string,
    totalSpent: number
}

export async function getSummary(month: string): Promise<Summary> {
    const [budgets, transactions, categories] = await Promise.all([
        getBudgets(),
        getTransactions(),
        getCategories()
    ])

    const monthBudgets = budgets.filter(b => b.month === month)
    const monthTransactions = transactions.filter(t => t.date.startsWith(month))

    const budgetVsActual: BudgetVsActual[] = monthBudgets.map(budget => {
        const category = categories.find(c => c.id === budget.categoryId)
        const spentAmount = monthTransactions
            .filter(t => t.categoryId === budget.categoryId)
            .reduce((sum, t) => sum + t.amount, 0)

        return {
            categoryId: budget.categoryId,
            categoryName: category?.name ?? "Unknown",
            limitAmount: budget.limitAmount,
            spentAmount
        }
    })

    const monthCategoryIds = [...new Set(monthTransactions.map(t => t.categoryId))]
    const spendByCategory: CategoryBreakdown[] = monthCategoryIds.map(categoryId => {
        const category = categories.find(c => c.id === categoryId)
        const amount = monthTransactions
            .filter(t => t.categoryId === categoryId)
            .reduce((sum, t) => sum + t.amount, 0)

        return {
            categoryId,
            categoryName: category?.name ?? "Unknown",
            color: category?.color ?? "#6b7280",
            amount
        }
    })

    const totalSpent = monthTransactions.reduce((sum, t) => sum + t.amount, 0)
    const budgeted = monthBudgets.reduce((sum, b) => sum + b.limitAmount, 0)
    const remaining = budgeted - totalSpent

    return { totalSpent, budgeted, remaining, spendByCategory, budgetVsActual }
}

export async function getTrends(months: number, endMonth: string): Promise<TrendPoint[]> {
    const transactions = await getTransactions()
    const [endYear, endMonthNum] = endMonth.split("-").map(Number)
    const points: TrendPoint[] = []

    for (let i = months - 1; i >= 0; i--) {
        const date = new Date(endYear, endMonthNum - 1 - i, 1)
        const period = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
        const totalSpent = transactions
            .filter(t => t.date.startsWith(period))
            .reduce((sum, t) => sum + t.amount, 0)

        points.push({ period, totalSpent })
    }

    return points
}