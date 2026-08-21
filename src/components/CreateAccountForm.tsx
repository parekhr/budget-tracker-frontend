import { useState } from "react";

type CreateAccountFormProps = {
    onSubmit: (username: string, password: string) => void;
};

export function CreateAccountForm({ onSubmit }: CreateAccountFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(username, password);
            }}
        >
            <div>
                <label className="block text-gray-400 text-sm mb-1">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-neutral-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <button
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300"
            >
                Create Account
            </button>
        </form>
    );
}
