import { type Category } from "../api/categories";
import { getCategoryColorStyle } from "../utils/categoryColors";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryListProps {
    categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
    return (
        <div className="flex flex-col gap-2">
            {categories.map(category => (
                <div key={category.id} className="flex justify-between items-center border border-white/10 rounded-xl px-4 py-3" style={getCategoryColorStyle(category.color)}>
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                        <button
                            className="h-6 px-1 flex items-center justify-center rounded cursor-pointer hover:bg-black/20"
                            aria-label="Edit Category"
                        >
                            <Pencil size={14} className="text-gray-400" />
                        </button>
                        <button
                            className="h-6 px-1 flex items-center justify-center rounded cursor-pointer hover:bg-black/20"
                            aria-label="Delete Category"
                        >
                            <Trash2 size={14} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
