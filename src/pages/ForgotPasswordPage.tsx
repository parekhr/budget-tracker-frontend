import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export function ForgotPasswordPage() {
    const navigate = useNavigate();

    function handleForgotPassword(_email: string) {
        // will add once backend is set up
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>
                <ForgotPasswordForm onSubmit={handleForgotPassword} />
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 text-sm text-gray-400 hover:text-white cursor-pointer transition duration-300"
                >
                    Back to login
                </button>
            </div>
        </div>
    );
}
