import { CategoryList } from "../components/CategoryList";
import { useState, useEffect } from "react";
import { getCategories, deleteCategory, updateCategory, type Category } from "../api/categories";
import { Modal } from "../components/Modal";
import { CategoryForm } from "../components/CategoryForm";

export function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modal, setModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    function handleDeleteCategory(id: number) {
            deleteCategory(id).then(() => {
                setCategories(prev => prev.filter(c => c.id !== id));
            });
        }
    
        function handleEditCategory(updatedCategory: Category) {
            updateCategory(updatedCategory).then((newCategory) => {
                setCategories(prev => prev.map(c => c.id === newCategory.id ? newCategory : c));
            });
        }
    
        function handleStartEditCategory(category: Category) {
            setModal(true);
            setEditingCategory(category);
        }

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Categories Page</h1>
                    <button
                        onClick={() => {
                            // Logic to open a modal or navigate to a category creation page
                            setModal(true);
                            setEditingCategory(null);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                    >
                        + Add Category
                    </button>
                </div>
                <CategoryList categories={categories}/>
            </div>
            {modal && (
                            <Modal onClose={() => setModal(false)}>
                                <CategoryForm
                                    category={editingCategory}
                                    onCreate={(newCategory) => {
                                        setCategories(prev => [...prev, newCategory]);
                                        setModal(false);
                                    }}
                                    onUpdate={(updatedCategory) => {
                                        handleEditCategory(updatedCategory);
                                        setModal(false);
                                    }}
                                />
                            </Modal>
                        )}
        </div>
    );
}