import { useState } from "react";

type ChangePasswordProps = {
    onSubmit: (currentPassword: string, newPassword: string, confirmNewPassword: string) => void;
    isSubmitting?: boolean;
};

export function ChangePasswordForm({ onSubmit, isSubmitting }: ChangePasswordProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(currentPassword, newPassword, confirmNewPassword);
            }}
        >
            <h1 className="text-lg font-bold text-white">Change Password</h1>
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <label className="block text-gray-400 text-sm mb-1">Confirm New Password</label>
            <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />            
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Saving..." : "Change Password"}
            </button>
        </form>
    );
}
