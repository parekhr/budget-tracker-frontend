import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 border border-white/10 bg-neutral-800 text-white placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-white/10 bg-neutral-800 text-white placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </form>
                <button
                    onClick={() => {
                        login()
                        navigate("/")
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    )
}