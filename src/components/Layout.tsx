import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function Layout() {
    const { logout } = useAuth()
    return(
        <>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/budgets">Budgets</Link>
                <button onClick={() => logout()}>Logout</button>
                
            </nav>
            <Outlet />
        </>
    )
}