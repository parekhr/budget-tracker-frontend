import { useState } from "react";

type LoginFormProps = {
    onSubmit: (email: string, password: string) => void;
    isSubmitting?: boolean;
};

export function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(email, password);
            }}
        >
            <input
                type="email"
                autoCapitalize="none"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
                disabled={isSubmitting}
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
