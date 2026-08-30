import { useState } from "react";

type ResetPasswordFormProps = {
    onSubmit: (newPassword: string, confirmPassword: string) => void;
    isSubmitting?: boolean;
};

export function ResetPasswordForm({ onSubmit, isSubmitting }: ResetPasswordFormProps) {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return (
        <form
            className="flex flex-col gap-3 text-left"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(newPassword, confirmPassword);
            }}
        >
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-white/10 rounded bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
        </form>
    );
}