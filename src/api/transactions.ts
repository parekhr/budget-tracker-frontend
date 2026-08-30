import { apiFetch } from "./client";

export interface Transaction {
    id: number,
    amount: number,
    date: string,
    title: string,
    category: number,
    createdAt: string
    additionalNotes?: string
}

export function getTransactions(): Promise<Transaction[]>{
        return apiFetch<Transaction[]>("/transactions/");
}

export function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    return apiFetch<Transaction>("/transactions/", {
        method: "POST",
        body: JSON.stringify(transaction)
    });
}

export function updateTransaction(transaction: Transaction): Promise<Transaction> {
    return apiFetch<Transaction>(`/transactions/${transaction.id}/`, {
        method: "PUT",
        body: JSON.stringify(transaction)
    });
}

export function deleteTransaction(id : number): Promise<void> {
    return apiFetch<void>(`/transactions/${id}/`, {
        method: "DELETE"
    });
}