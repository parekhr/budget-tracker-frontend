import { useAuth } from '../context/AuthContext.tsx'
import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children}: {children: ReactNode}) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
}