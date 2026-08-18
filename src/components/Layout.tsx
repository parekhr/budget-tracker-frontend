import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function Layout() {
    const { logout } = useAuth()
    return(
        <>
            <nav className="flex items-center gap-6 px-6 py-4 bg-white border-b border-gray-200">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
                <Link to="/transactions" className="text-gray-700 hover:text-blue-600 transition">Transactions</Link>
                <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition">Categories</Link>
                <Link to="/budgets" className="text-gray-700 hover:text-blue-600 transition">Budgets</Link>
                <button
                    onClick={() => logout()}
                    className="ml-auto px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition cursor-pointer"
                >
                    Logout
                </button>
            </nav>
            <Outlet />
        </>
    )
}