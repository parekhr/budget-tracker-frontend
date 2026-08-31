import { useState } from "react";

type CreateAccountFormProps = {
    onSubmit: (username: string, password: string, confirmPassword: string, email: string) => void;
    isSubmitting?: boolean;
};

export function CreateAccountForm({ onSubmit, isSubmitting }: CreateAccountFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const isValidUsername = username.trim() !== "";
    const isValidPassword = password.length >= 8;
    const doPasswordsMatch = confirmPassword !== "" && password === confirmPassword;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                if (!isValidUsername || !isValidPassword || !doPasswordsMatch || !isValidEmail) return;
                onSubmit(username, password, confirmPassword, email);
            }}
        >
            <div>
                <label className="block text-gray-400 text-sm mb-1">Username</label>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full px-3 py-2 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-600 ${!submitted || isValidUsername ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !isValidUsername && (
                    <p className="text-red-400 text-sm mt-1">Please enter a username</p>
                )}
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-600 ${!submitted || isValidPassword ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !isValidPassword && (
                    <p className="text-red-400 text-sm mt-1">Password must be at least 8 characters</p>
                )}
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-600 ${!submitted || doPasswordsMatch ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !doPasswordsMatch && (
                    <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
                )}
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-600 ${!submitted || isValidEmail ? "border-white/10" : "border-red-500 bg-red-950/40"}`}
                />
                {submitted && !isValidEmail && (
                    <p className="text-red-400 text-sm mt-1">Please enter a valid email</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
        </form>
    );
}
