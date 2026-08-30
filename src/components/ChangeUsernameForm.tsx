import { useState } from "react";

type ChangeUsernameProps = {
    onSubmit: (username: string) => void;
    isSubmitting?: boolean;
};

export function ChangeUsernameForm({ onSubmit, isSubmitting }: ChangeUsernameProps) {
    const [username, setUsername] = useState("");

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(username);
            }}
        >
            <h1 className="text-lg font-bold text-white">Change Username</h1>
            <label className="block text-gray-400 text-sm mb-1">New Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="New Username"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />          
            <button
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving..." : "Change Username"}
            </button>
        </form>
    );
}
