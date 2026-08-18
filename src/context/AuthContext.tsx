import { useState, createContext, useContext, type ReactNode } from 'react';

export interface AuthContextType {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login() {
        setIsAuthenticated(true);
    }

    function logout() {
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}