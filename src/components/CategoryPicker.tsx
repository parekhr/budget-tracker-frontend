import { useEffect, useState } from "react"
import { getCategories, type Category } from "../api/categories"

type CategoryPickerProps = {
    value: number | ""
    onChange: (categoryId: number) => void
}
export function CategoryPicker({ value, onChange }: CategoryPickerProps) {

    const [categories, setCategories] = useState<Category[]>([]);
    
    useEffect(() => {
        getCategories().then(setCategories);
    }, [])

    return (
        <div>
            <select
                className="border border-gray-300 rounded px-3 py-2"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    )
}