const transactionArray: Transaction[] = [
    {
        id: 1,
        amount: 61.62,
        date: '2026-08-10',
        title: 'In-N-Out',
        categoryId: 1,
        userId: 1,
        createdAt: '2026-08-10T09:00:00.000Z',
        additionalNotes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus sed omnis totam debitis repudiandae sunt, ut consequuntur iure animi? Illum quibusdam ratione aut explicabo deserunt sequi iste, placeat aliquam velit?'
    },
    {
        id: 2,
        amount: 12.99,
        date: '2026-08-02',
        title: 'Spotify Premium',
        categoryId: 2,
        userId: 1,
        createdAt: '2026-08-02T09:00:00.000Z',
        additionalNotes: ''
    },
    {
        id: 3,
        amount: 64.36,
        date: '2026-08-03',
        title: 'Gaming Headset',
        categoryId: 3,
        userId: 1,
        createdAt: '2026-08-03T09:00:00.000Z',
        additionalNotes: ''
    },
    {
        id: 4,
        amount: 264.36,
        date: '2026-08-23',
        title: 'Krispy Kreme',
        categoryId: 1,
        userId: 1,
        createdAt: '2026-08-23T09:00:00.000Z',
        additionalNotes: ''
    },
    {
        id: 5,
        amount: 1563.90,
        date: '2026-08-23',
        title: 'Nexon Cash',
        categoryId: 2,
        userId: 1,
        createdAt: '2026-08-23T09:00:00.000Z',
        additionalNotes: ''
    }
    ,
    {
        id: 6,
        amount: 2763.75,
        date: '2026-08-23',
        title: 'Howling Rays',
        categoryId: 1,
        userId: 1,
        createdAt: '2026-08-23T09:00:00.000Z',
        additionalNotes: ''
    }
];

export interface Transaction {
    id: number,
    amount: number,
    date: string,
    title: string,
    categoryId: number,
    userId: number,
    createdAt: string
    additionalNotes?: string
}

export function getTransactions(): Promise<Transaction[]>{
        return Promise.resolve([...transactionArray]);
}

export function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    const newTransaction = { ...transaction, id: Math.floor(Math.random() * 1000) + 1, createdAt: new Date().toISOString() }
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

export function reassignTransactionsCategory(oldCategoryId: number, newCategoryId: number): Promise<void> {
    transactionArray.forEach(t => {
        if (t.categoryId === oldCategoryId) t.categoryId = newCategoryId;
    });

    return Promise.resolve();
}