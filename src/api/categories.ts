const categoryArray: Category[] = [
    {
        id: 1,
        name: "Food",
        color: "#ec4899",
        userId: 1
    },
    {
        id: 2,
        name: "Gaming",
        color: "#22c55e",
        userId: 1
    },
    {
        id: 3,
        name: "Subscriptions",
        color: "#3b82f6",
        userId: 1
    }
];

export interface Category{
    id: number,
    name: string,
    color: string,
    userId: number,
}

export function getCategories(): Promise<Category[]>{
    return Promise.resolve([...categoryArray]);
}

export function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const newCategory = { ...category, id: Math.floor(Math.random() * 1000) + 1 }
    categoryArray.push(newCategory);

    return Promise.resolve(newCategory)
}

export function updateCategory(category: Category): Promise<Category> {
    const indexToUpdate = categoryArray.findIndex(item => item.id === category.id);
    categoryArray[indexToUpdate] = category;

    return Promise.resolve(category)
}

export function deleteCategory(id: number): Promise<void> {
    const indexToDelete = categoryArray.findIndex(item => item.id === id);
    categoryArray.splice(indexToDelete, 1);

    return Promise.resolve();
}