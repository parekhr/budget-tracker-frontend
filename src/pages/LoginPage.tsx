import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    return (
        <div>
            <h1>Login Page</h1>
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
    )
}