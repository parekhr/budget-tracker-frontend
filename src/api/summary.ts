import { apiFetch } from "./client"

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
    return apiFetch<Summary>(`/summary/?month=${month}`);
}

export async function getTrends(months: number, endMonth: string): Promise<TrendPoint[]> {
    return apiFetch<TrendPoint[]>(`/trends/?months=${months}&endMonth=${endMonth}`);
}