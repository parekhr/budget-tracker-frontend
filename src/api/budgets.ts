import { apiFetch } from "./client";

export interface Budget {
    id: number,
    category: number,
    month: string,
    limitAmount: number
}

export function getBudgets(): Promise<Budget[]> {
    return apiFetch<Budget[]>(`/budgets/`);
}

export function createBudget(budget: Omit<Budget, 'id'>): Promise<Budget> {
    return apiFetch<Budget>(`/budgets/`, {
        method: "POST",
        body: JSON.stringify(budget)
    });
}

export function updateBudget(budget: Budget): Promise<Budget> {
    return apiFetch<Budget>(`/budgets/${budget.id}/`, {
        method: "PUT",
        body: JSON.stringify(budget)
    });
}

export function deleteBudget(id: number): Promise<void> {
    return apiFetch<void>(`/budgets/${id}/`, {
        method: "DELETE"
    });
}