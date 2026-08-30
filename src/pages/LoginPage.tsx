import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LoginForm } from "../components/LoginForm"


export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const successMessage = location.state?.message

    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-sm text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
                <LoginForm
                    isSubmitting={isSubmitting}
                    onSubmit={async (email, password) => {
                        setError(null)
                        setIsSubmitting(true)
                        try {
                            await login(email, password)
                            navigate("/")
                        } catch {
                            setError("Invalid email or password")
                        } finally {
                            setIsSubmitting(false)
                        }
                    }}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
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
