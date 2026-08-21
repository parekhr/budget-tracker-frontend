import { useState } from "react";

type ChangePasswordProps = {
    onSubmit: (password: string) => void;
};

export function ChangePasswordForm({ onSubmit }: ChangePasswordProps) {
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(password);
            }}
        >
            <label className="block text-gray-400 text-sm mb-1">Current Password</label>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <label className="block text-gray-400 text-sm mb-1">New Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <label className="block text-gray-400 text-sm mb-1">Confirm New Password</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />            
            <button
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300"
            >
                Reset Password
            </button>
        </form>
    );
}
