import { useNavigate } from "react-router-dom";
import { CreateAccountForm } from "../components/CreateAccountForm";

export function CreateAccountPage() {
    const navigate = useNavigate();

    function handleCreateAccount(_username: string, _password: string) {
        // will add once backend is set up
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>
                <CreateAccountForm onSubmit={handleCreateAccount} />
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
