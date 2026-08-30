import { type Category } from "../api/categories";
import { getCategoryColorStyle } from "../utils/categoryColors";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
    const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-2">
            {categories.length === 0 ? (
                <p className="text-gray-400 text-center text-sm">No categories</p>
            ) : (
                categories.map(category => (
                    <div
                        key={category.id}
                        className="flex justify-between items-center border border-white/10 rounded-xl px-4 py-3"
                        style={getCategoryColorStyle(category.color)}
                    >
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center gap-2">
                            {!category.isDefault && (
                                <button
                                    onClick={() => onEdit(category)}
                                    className="h-6 px-1 flex items-center justify-center rounded cursor-pointer hover:bg-white/10"
                                    aria-label="Edit Category"
                                >
                                    <Pencil size={14} className="text-gray-400" />
                                </button>
                            )}
                            {!category.isDefault && (
                                <button
                                    onClick={() => {
                                        if (confirmingDeleteId === category.id) {
                                            onDelete(category.id);
                                            setConfirmingDeleteId(null);
                                        } else {
                                            setConfirmingDeleteId(category.id);
                                        }
                                    }}
                                    onBlur={() => setConfirmingDeleteId(null)}
                                    className={`h-6 flex items-center justify-center rounded cursor-pointer ${confirmingDeleteId === category.id ? "px-2 bg-red-500/20 hover:bg-red-500/30" : "px-1 hover:bg-white/10"}`}
                                    aria-label={confirmingDeleteId === category.id ? "Confirm delete category" : "Delete Category"}
                                >
                                    {confirmingDeleteId === category.id ? (
                                        <span className="text-red-400 text-xs font-medium leading-none">Confirm?</span>
                                    ) : (
                                        <Trash2 size={14} className="text-gray-400" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
