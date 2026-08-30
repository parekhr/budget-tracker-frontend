import { useNavigate } from "react-router-dom";
import { CreateAccountForm } from "../components/CreateAccountForm";
import { AuthLayout } from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export function CreateAccountPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();

    async function handleCreateAccount(_username: string, _password: string, _confirmPassword: string, _email: string) {
        setError(null);
        setIsSubmitting(true);
        try{
            await register(_username, _password, _confirmPassword, _email)
            navigate("/");
        } catch {
            setError("Failed to create account. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout>
            <div className="w-full max-w-xl text-center">
                <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>
                <CreateAccountForm onSubmit={handleCreateAccount} isSubmitting={isSubmitting} />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
