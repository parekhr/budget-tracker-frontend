import { useAuth } from '@/app/context/AuthContext.tsx'
import { type ReactNode } from 'react'

function ProtectedRoute({ children}: {children: ReactNode}) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
}