const transactionArray: Transaction[] = [
    {
        id: 1,
        amount: 100,
        date: '2026-08-01',
        note: 'idk',
        categoryId: 1,
        userId: 1
    },
    {
        id: 2,
        amount: 50,
        date: '2026-08-02',
        note: 'idk2',
        categoryId: 2,
        userId: 1
    },
    {
        id: 3,
        amount: 200,
        date: '2026-08-03',
        note: 'idk3',
        categoryId: 3,
        userId: 1
    }
];

export interface Transaction {
    id: number,
    amount: number,
    date: string,
    note: string,
    categoryId: number,
    userId: number
}

export function getTransactions(): Promise<Transaction[]>{
        return Promise.resolve([...transactionArray]);
}

export function createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const newTransaction = { ...transaction, id: Math.floor(Math.random() * 1000) + 1 }
    transactionArray.push(newTransaction);

    return Promise.resolve(newTransaction);
}

export function updateTransaction(transaction: Transaction): Promise<Transaction> {
    const indexToUpdate = transactionArray.findIndex(item => item.id === transaction.id);
    transactionArray[indexToUpdate] = transaction;

    return Promise.resolve(transaction);
}

export function deleteTransaction(id : number): Promise<void> {
    const indexToDelete = transactionArray.findIndex(item => item.id === id);
    transactionArray.splice(indexToDelete, 1);

    return Promise.resolve();
}