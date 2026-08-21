import { getBudgets } from "./budgets"
import { getTransactions } from "./transactions"
import { getCategories } from "./categories"

const summary: Summary = {
    totalSpent: 1000,
    budgeted: 2000,
    remaining: 1000,
    spendByCategory: [
    {
        categoryId: 1,
        categoryName: "Shopping",
        color: "green",
        amount: 500
    },
    {
        categoryId: 2,
        categoryName: "Gaming",
        color: "blue",
        amount: 500
    },
    {
        categoryId: 3,
        categoryName: "Entertainment",
        color: "red",
        amount: 300
    },
    {
        categoryId: 4,
        categoryName: "Groceries",
        color: "yellow",
        amount: 1500
    },
    {
        categoryId: 5,
        categoryName: "Utilities",
        color: "purple",
        amount: 5000
    },
    {
        categoryId: 6,
        categoryName: "Health",
        color: "pink",
        amount: 1451
    },
    {
        categoryId: 7,
        categoryName: "Travel",
        color: "teal",
        amount: 7302
    },
    
    ],
    budgetVsActual: []
}

const trendPoints: TrendPoint[] = [
    {
        period: "2026-02",
        totalSpent: 2532
    },
    {
        period: "2026-03",
        totalSpent: 104
    },
    {
        period: "2026-04",
        totalSpent: 500
    },
    {
        period: "2026-05",
        totalSpent: 750
    },
    {
        period: "2026-06",
        totalSpent: 1500
    },
    {
        period: "2026-07",
        totalSpent: 3500
    },
    {
        period: "2026-08",
        totalSpent: 4500
    }
]

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

    return { ...summary, budgetVsActual }
}

export function getTrends(months: number): Promise<TrendPoint[]> {
    const newTrendPoints = trendPoints.slice(-months)
    return Promise.resolve(newTrendPoints);
}