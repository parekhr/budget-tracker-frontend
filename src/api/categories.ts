import { apiFetch } from "./client";

export interface Category{
    id: number,
    name: string,
    color: string,
    isDefault: boolean,
}

export function getCategories(): Promise<Category[]>{
    return apiFetch<Category[]>("/categories/")
}

export function createCategory(category: Omit<Category, 'id' | 'isDefault'>): Promise<Category> {
    return apiFetch<Category>("/categories/", {
        method: "POST",
        body: JSON.stringify(category)
    });
}

export function updateCategory(category: Category): Promise<Category> {
    return apiFetch<Category>(`/categories/${category.id}/`, {
        method: "PUT",
        body: JSON.stringify(category)
    });
}

export function deleteCategory(id: number): Promise<void> {
    return apiFetch<void>(`/categories/${id}/`, {
        method: "DELETE"
    });
}