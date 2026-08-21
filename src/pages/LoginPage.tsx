import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LoginForm } from "../components/LoginForm"

export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
                <LoginForm
                    onSubmit={() => {
                        login()
                        navigate("/")
                    }}
                />
                <div className="flex items-center justify-between mt-4 text-sm">
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="text-gray-400 hover:text-white cursor-pointer transition duration-300"
                    >
                        Forgot password?
                    </button>
                    <button
                        onClick={() => navigate("/create-account")}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer transition duration-300"
                    >
                        Create new account
                    </button>
                </div>
            </div>
        </div>
    )
}
