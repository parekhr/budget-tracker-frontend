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
    }
    ],
    budgetVsActual: [{
        categoryId: 1,
        categoryName: "Shopping",
        limitAmount: 1000,
        spentAmount: 1000
    }]
}

const trendPoints: TrendPoint[] = [
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

export function getSummary(month: string): Promise<Summary> {
    return Promise.resolve(summary);
}

export function getTrends(months: number): Promise<TrendPoint[]> {
    const newTrendPoints = trendPoints.slice(-months)
    return Promise.resolve(newTrendPoints);
}