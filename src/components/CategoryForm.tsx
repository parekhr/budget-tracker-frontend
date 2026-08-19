import { createCategory, type Category } from "../api/categories";
import { useState, useEffect } from "react";

const COLOR_SWATCHES_LIGHT = [
    "#f9a8d4", // pink
    "#86efac", // green
    "#93c5fd", // blue
    "#d8b4fe", // purple
    "#fdba74", // orange
    "#fde047", // yellow
    "#fca5a5", // red
    "#5eead4", // teal
];

const COLOR_SWATCHES_DARK = [
    "#be185d", // pink
    "#15803d", // green
    "#1d4ed8", // blue
    "#7e22ce", // purple
    "#c2410c", // orange
    "#a16207", // yellow
    "#b91c1c", // red
    "#0f766e", // teal
];

const COLOR_SWATCHES = [...COLOR_SWATCHES_LIGHT, ...COLOR_SWATCHES_DARK];

type CategoryFormProps = {
    category?: Category | null;
    onCreate: (category: Category) => void;
    onUpdate: (category: Category) => void;
};

export function CategoryForm({ category, onCreate, onUpdate }: CategoryFormProps) {

    const [name, setName] = useState(category ? category.name : "");
    const [color, setColor] = useState(category ? category.color : COLOR_SWATCHES[0]);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setColor(category.color);
        } else {
            setName("");
            setColor(COLOR_SWATCHES[0]);
        }
    }, [category]);

    return (
        <div className="max-w-sm">
            <h1 className="text-xl font-bold text-white mb-4">
                {category ? "Update Category" : "Add a Category"}
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (category) {
                        onUpdate({ ...category, name, color });
                    } else {
                        createCategory({ name, color, userId: 1 }).then(newCategory => {
                            onCreate(newCategory);
                            setName("");
                            setColor(COLOR_SWATCHES[0]);
                        });
                    }
                }}
                className="flex flex-col gap-3"
            >
                <label className="text-gray-400 text-sm">Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category Name"
                    className="border rounded px-3 py-2 bg-neutral-800 text-white placeholder-gray-500 border-white/10"
                />
                <label className="text-gray-400 text-sm">Category Color</label>
                <div className="flex flex-wrap justify-center gap-2">
                    {COLOR_SWATCHES_LIGHT.map((swatch) => (
                        <button
                            key={swatch}
                            type="button"
                            onClick={() => setColor(swatch)}
                            aria-label={`Select color ${swatch}`}
                            className={`w-8 h-8 rounded-full cursor-pointer transition ${color === swatch ? "ring-2 ring-offset-2 ring-offset-neutral-900 ring-white" : ""}`}
                            style={{ backgroundColor: swatch }}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {COLOR_SWATCHES_DARK.map((swatch) => (
                        <button
                            key={swatch}
                            type="button"
                            onClick={() => setColor(swatch)}
                            aria-label={`Select color ${swatch}`}
                            className={`w-8 h-8 rounded-full cursor-pointer transition ${color === swatch ? "ring-2 ring-offset-2 ring-offset-neutral-900 ring-white" : ""}`}
                            style={{ backgroundColor: swatch }}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
                >
                    {category ? "Update Category" : "Create Category"}
                </button>
            </form>
        </div>
    )
}
