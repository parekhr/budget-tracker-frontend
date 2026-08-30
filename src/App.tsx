import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ResetPasswordPage } from "./pages/ResetPasswordPage"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { LoginPage } from "./pages/LoginPage"
import { CreateAccountPage } from "./pages/CreateAccountPage"
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage"
import { DashboardPage } from "./pages/DashboardPage"
import { TransactionsPage } from "./pages/TransactionsPage"
import { CategoriesPage } from "./pages/CategoriesPage"
import { BudgetsPage } from "./pages/BudgetsPage"
import { Layout } from "./components/Layout"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPasswordPage />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/budgets" element={<BudgetsPage />} />
              </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
