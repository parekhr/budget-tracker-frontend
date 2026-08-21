import { useState } from "react";

type LoginFormProps = {
    onSubmit: (username: string, password: string) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(username, password);
            }}
        >
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300"
            >
                Login
            </button>
        </form>
    );
}
