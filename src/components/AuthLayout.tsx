import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative h-screen overflow-hidden bg-neutral-800 flex flex-col items-center justify-evenly gap-3 p-5">
            <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />

            <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-5 text-center bg-neutral-900/90 backdrop-blur-sm border border-white/10 rounded-2xl p-10 shadow-2xl w-full max-w-6xl">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                            $
                        </div>
                        <span className="text-2xl font-bold text-white">Budget Tracker</span>
                    </div>
                    <p className="text-gray-400 text-lg max-w-md">
                        Track spending, set monthly budgets by category, and catch overspending before it happens.
                    </p>
                </div>

                <div className="w-full grid grid-cols-3 gap-4" aria-hidden="true">
                    <div className="bg-neutral-800 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-2">Monthly Budget</div>
                        <div className="text-lg font-bold text-white">$4,500</div>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-2">Total Spent</div>
                        <div className="text-lg font-bold text-white">$3,120</div>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-2">Remaining</div>
                        <div className="text-lg font-bold text-green-400">$1,380</div>
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4" aria-hidden="true">
                    <div className="bg-neutral-800 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-300 mb-2">Spend by category</div>
                        <div className="flex gap-2">
                                <div className="flex flex-col justify-between h-24 text-xs text-gray-500">
                                <span>$3.2k</span>
                                <span>$1.6k</span>
                                <span>$0</span>
                            </div>
                            <div className="flex-1 flex items-end justify-center gap-3 h-24 border-l border-b border-white/10 pl-2">
                                <div className="w-20 rounded-t bg-pink-500" style={{ height: "90%" }} />
                                <div className="w-20 rounded-t bg-green-500" style={{ height: "55%" }} />
                                <div className="w-20 rounded-t bg-blue-500" style={{ height: "25%" }} />
                                <div className="w-20 rounded-t bg-pink-500" style={{ height: "70%" }} />
                                <div className="w-20 rounded-t bg-green-500" style={{ height: "40%" }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-1.5 text-[9px] text-gray-500">
                            <span className="flex items-center gap-5"><span className="h-1.5 w-1.5 rounded-full bg-pink-500" />Food</span>
                            <span className="flex items-center gap-5"><span className="h-1.5 w-1.5 rounded-full bg-green-500" />Gaming</span>
                            <span className="flex items-center gap-5"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Subs</span>
                        </div>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-4">
                        <div className="text-xs font-semibold text-gray-300 mb-2">Spending trend</div>
                        <div className="flex gap-2">
                            <div className="flex flex-col justify-between h-24 text-[9px] text-gray-500">
                                <span>$6k</span>
                                <span>$3k</span>
                                <span>$0</span>
                            </div>
                            <div className="flex-1 h-24 border-l border-b border-white/10 pl-2">
                                <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full h-full">
                                    <polyline points="0,50 40,48 80,45 120,40 160,20 200,5" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1.5 pl-8 text-[9px] text-gray-500">
                            <span>Jan</span>
                            <span>Apr</span>
                            <span>Aug</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex-shrink-0 bg-neutral-900/90 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-xl">
                {children}
            </div>

            <div className="relative z-10 flex-1 min-h-0 max-h-96 flex flex-col bg-neutral-900/90 backdrop-blur-sm border border-white/10 rounded-2xl p-10 w-full max-w-6xl shadow-2xl" aria-hidden="true">
                <div className="flex-shrink-0 mb-6 text-center">
                    <h3 className="text-xl font-bold text-white">Everything you need, in one place</h3>
                    <p className="text-gray-400 text-sm">Track spending, organize categories, and manage budgets</p>
                </div>
                <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-neutral-800 rounded-lg p-5 flex flex-col justify-center gap-10 overflow-hidden">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between text-md">
                                <span className="flex items-center gap-1.5 text-gray-300"><span className="h-2.5 w-2.5 rounded-full bg-pink-500" />Coffee Shop</span>
                                <span className="text-white font-medium">$12.40</span>
                            </div>
                            <div className="flex items-center justify-between text-md">
                                <span className="flex items-center gap-1.5 text-gray-300"><span className="h-2.5 w-2.5 rounded-full bg-green-500" />Steam</span>
                                <span className="text-white font-medium">$59.99</span>
                            </div>
                            <div className="flex items-center justify-between text-md">
                                <span className="flex items-center gap-1.5 text-gray-300"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />Netflix</span>
                                <span className="text-white font-medium">$15.49</span>
                            </div>
                            
                        </div>
                        <div>
                            <div className="text-base font-semibold text-white text-center">Transactions</div>
                            <div className="text-md text-gray-500 text-center">Log and browse every expense</div>
                        </div>
                    </div>

                    <div className="bg-neutral-800 rounded-lg p-3 flex flex-col justify-center gap-14 overflow-hidden">
                        <div className="flex flex-wrap gap-5">
                            <span className="px-3 py-1.5 rounded-full text-xs bg-pink-500/20 text-pink-300">Food and drinks</span>
                            <span className="px-3 py-1.5 rounded-full text-xs bg-green-500/20 text-green-300">Gaming</span>
                            <span className="px-3 py-1.5 rounded-full text-xs bg-blue-500/20 text-blue-300">Subscriptions</span>
                            <span className="px-3 py-1.5 rounded-full text-xs bg-orange-500/20 text-orange-300">House work</span>
                            <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/20 text-red-300">Transportation</span>
                            <span className="px-3 py-1.5 rounded-full text-xs bg-purple-500/20 text-purple-300">Health</span>
                        </div>
                        <div>
                            <div className="text-base font-semibold text-white text-center">Categories</div>
                            <div className="text-md text-gray-500 text-center">Organize spending your way</div>
                        </div>
                    </div>

                    <div className="bg-neutral-800 rounded-lg p-3 flex flex-col justify-center gap-10 overflow-hidden">
                        <div className="flex flex-col gap-7.5">
                            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: "60%" }} />
                            </div>
                            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: "85%" }} />
                            </div>
                            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-semibold text-white text-center">Budgets</div>
                            <div className="text-md text-gray-500 text-center">Set limits and catch overspending</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
