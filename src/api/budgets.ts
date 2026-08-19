const budgetArray: Budget[] = [
    {
        id: 1,
        userId: 1,
        categoryId: 1,
        month: "2026-08",
        limitAmount: 2000
    },
    {
        id: 2,
        userId: 1,
        categoryId: 2,
        month: "2026-08",
        limitAmount: 5000
    },
    {
        id: 3,
        userId: 1,
        categoryId: 3,
        month: "2026-08",
        limitAmount: 10000
    }

]

export interface Budget {
    id: number,
    userId: number,
    categoryId: number,
    month: string,
    limitAmount: number
}

export function getBudgets(): Promise<Budget[]> {
    return Promise.resolve([...budgetArray]);
}

export function createBudget(budget: Omit<Budget, 'id'>): Promise<Budget> {
    const newBudget = { ...budget, id: Math.floor(Math.random() * 1000) + 1 };
    budgetArray.push(newBudget);
    return Promise.resolve(newBudget);
}

export function updateBudget(budget: Budget): Promise<Budget> { 
    const indexToUpdate = budgetArray.findIndex(item => item.id === budget.id);
    budgetArray[indexToUpdate] = budget;
    return Promise.resolve(budget);
}

export function deleteBudget(id: number): Promise<void> {
    const indexToDelete = budgetArray.findIndex(item => item.id === id);
    budgetArray.splice(indexToDelete, 1);
    return Promise.resolve();
}