import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function Layout() {
    const { logout } = useAuth()
    return(
        <>
            <nav className="flex items-center gap-6 px-6 py-4 bg-black border-b border-white/10">
                <Link to="/" className="text-gray-400 hover:text-white transition text-sm font-medium">Dashboard</Link>
                <Link to="/transactions" className="text-gray-400 hover:text-white transition text-sm font-medium">Transactions</Link>
                <Link to="/categories" className="text-gray-400 hover:text-white transition text-sm font-medium">Categories</Link>
                <Link to="/budgets" className="text-gray-400 hover:text-white transition text-sm font-medium">Budgets</Link>
                <button
                    onClick={() => logout()}
                    className="ml-auto px-3 py-1.5 text-sm bg-red-950/40 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/40 transition cursor-pointer"
                >
                    Logout
                </button>
            </nav>
            <Outlet />
        </>
    )
}