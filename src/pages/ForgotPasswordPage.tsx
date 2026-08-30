import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { AuthLayout } from "../components/AuthLayout";
import { apiFetch } from "../api/client";
import { useState } from "react";

export function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleForgotPassword(_email: string) {
        setIsSubmitting(true);
        try {
            await apiFetch('/password-reset/', {
                method: 'POST',
                body: JSON.stringify({ email: _email }),
            });
            setConfirmationMessage("A password reset link has been sent. Please check your email.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout>
            <div className="w-full max-w-xl text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>
                <ForgotPasswordForm onSubmit={handleForgotPassword} isSubmitting={isSubmitting} />
                {confirmationMessage && <p className="text-green-500 text-sm mt-2">{confirmationMessage}</p>}
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 text-sm text-gray-400 hover:text-white cursor-pointer transition duration-300"
                >
                    Back to login
                </button>
            </div>
        </AuthLayout>
    );
}
