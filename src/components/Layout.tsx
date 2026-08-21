import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { Modal } from "./Modal";

export function Layout() {
    const { logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

    return(
        <>
            <nav className="flex items-center gap-6 px-6 py-4 bg-black border-b border-white/10">
                <Link to="/" className="text-gray-400 hover:text-white transition text-sm font-medium">Dashboard</Link>
                <Link to="/transactions" className="text-gray-400 hover:text-white transition text-sm font-medium">Transactions</Link>
                <Link to="/categories" className="text-gray-400 hover:text-white transition text-sm font-medium">Categories</Link>
                <Link to="/budgets" className="text-gray-400 hover:text-white transition text-sm font-medium">Budgets</Link>
                <div className="ml-auto flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className="text-gray-400 hover:text-white transition text-sm font-medium cursor-pointer"
                        >
                            Account ▾
                        </button>

                        {menuOpen && (
                            <>
                                {/* invisible backdrop — clicking anywhere outside the menu closes it */}
                                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl z-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => { 
                                            setMenuOpen(false); 
                                            setChangePasswordModalOpen(true); }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 cursor-pointer"
                                    >
                                        Change password
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => logout()}
                        className="px-3 py-1.5 text-sm bg-red-950/40 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/40 transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            {changePasswordModalOpen && (
                <>
                    <Modal onClose={() => setChangePasswordModalOpen(false)}>
                        <ChangePasswordForm
                            onSubmit={(newPassword) => {
                                // Handle password change logic here
                                console.log("New password:", newPassword);
                                setChangePasswordModalOpen(false);
                            }}
                        />
                    </Modal>
                </>
            )}
            <div className="pt-2">
    <Outlet />
</div>
        </>
    )
}