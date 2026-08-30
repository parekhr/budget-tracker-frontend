import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangeUsernameForm } from "./ChangeUsernameForm";
import { Modal } from "./Modal";
import { apiFetch } from "../api/client";

export function Layout() {
    const { logout, username, setUsername } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [changeUsernameModalOpen, setChangeUsernameModalOpen] = useState(false);
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return(
        <>
            <nav className="relative flex items-center gap-6 px-6 py-4 bg-black border-b border-white/10">
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-400 hover:text-white transition text-sm font-medium">Dashboard</Link>
                    <Link to="/transactions" className="text-gray-400 hover:text-white transition text-sm font-medium">Transactions</Link>
                    <Link to="/categories" className="text-gray-400 hover:text-white transition text-sm font-medium">Categories</Link>
                    <Link to="/budgets" className="text-gray-400 hover:text-white transition text-sm font-medium">Budgets</Link>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(o => !o)}
                    className="md:hidden ml-auto text-gray-400 hover:text-white transition cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                <div className="hidden md:flex ml-auto items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className="text-gray-400 hover:text-white transition text-sm font-medium cursor-pointer"
                        >
                            {username} ▾
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
                                                setChangeUsernameModalOpen(true); }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 cursor-pointer"
                                        >
                                            Change username
                                        </button>

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

                {mobileMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-900 border-b border-white/10 flex flex-col p-4 gap-1 z-50">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2 text-gray-300 hover:bg-white/5 rounded text-sm font-medium">Dashboard</Link>
                            <Link to="/transactions" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2 text-gray-300 hover:bg-white/5 rounded text-sm font-medium">Transactions</Link>
                            <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2 text-gray-300 hover:bg-white/5 rounded text-sm font-medium">Categories</Link>
                            <Link to="/budgets" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2 text-gray-300 hover:bg-white/5 rounded text-sm font-medium">Budgets</Link>
                            <hr className="border-white/10 my-1" />
                            <div className="px-2 py-1 text-xs text-gray-500">{username}</div>
                            <button
                                onClick={() => { setMobileMenuOpen(false); setChangeUsernameModalOpen(true); }}
                                className="px-2 py-2 text-left text-gray-300 hover:bg-white/5 rounded text-sm cursor-pointer"
                            >
                                Change username
                            </button>
                            <button
                                onClick={() => { setMobileMenuOpen(false); setChangePasswordModalOpen(true); }}
                                className="px-2 py-2 text-left text-gray-300 hover:bg-white/5 rounded text-sm cursor-pointer"
                            >
                                Change password
                            </button>
                            <button
                                onClick={() => { setMobileMenuOpen(false); logout(); }}
                                className="px-2 py-2 text-left text-red-400 hover:bg-red-900/20 rounded text-sm cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </nav>
            {changeUsernameModalOpen && (
                <>
                    <Modal onClose={() => {
                        setChangeUsernameModalOpen(false);
                        setError(null);
                        setSuccessMessage(null);
                    }}>
                        <ChangeUsernameForm
                            isSubmitting={isSubmitting}
                            onSubmit={async (new_username) => {
                                setError(null);
                                setIsSubmitting(true);
                                try{
                                    await apiFetch('/change-username/', {
                                        method: 'POST',
                                        body: JSON.stringify({ newUsername: new_username }),
                                    });
                                    setUsername(new_username);
                                    localStorage.setItem("username", new_username);
                                    setSuccessMessage("Username changed successfully!");
                                    setTimeout(() => {
                                        setChangeUsernameModalOpen(false);
                                        setSuccessMessage(null);
                                    }, 1500);
                                } catch (err: any) {
                                    setError(err instanceof Error ? err.message : "Failed to change username");
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                    </Modal>
                </>
            )}
            {changePasswordModalOpen && (
                <>
                    <Modal onClose={() => {
                        setChangePasswordModalOpen(false);
                        setError(null);
                        setSuccessMessage(null);
                    }}>
                        <ChangePasswordForm
                            isSubmitting={isSubmitting}
                            onSubmit={async (currentPassword, newPassword, confirmNewPassword) => {
                                setError(null);
                                setIsSubmitting(true);
                                try{
                                    await apiFetch('/change-password/', {
                                        method: 'POST',
                                        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
                                    });
                                    setSuccessMessage("Password changed successfully!");
                                    setTimeout(() => {
                                        setChangePasswordModalOpen(false);
                                        setSuccessMessage(null);
                                    }, 1500);
                                } catch {
                                    setError("Failed to change password");
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                    </Modal>
                </>
            )}
            <div className="pt-2">
    <Outlet />
</div>
        </>
    )
}