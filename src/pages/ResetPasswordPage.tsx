import { apiFetch } from "../api/client";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export function ResetPasswordPage() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Reset Password</h1>
                <ResetPasswordForm
                    isSubmitting={isSubmitting}
                    onSubmit={async (newPassword, confirmPassword) => {
                        setError(null);
                        setIsSubmitting(true);
                        try {
                            await apiFetch("/password-reset/confirm/", {
                                method: "POST",
                                body: JSON.stringify({ uid, token, newPassword, confirmPassword }),
                            });
                            navigate("/login", { state: { message: "Password reset! Please log in with your new password." } });
                        } catch {
                            setError("Failed to reset password. Please try again.");
                        } finally {
                            setIsSubmitting(false);
                        }
                    }}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
}

