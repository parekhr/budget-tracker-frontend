import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { apiFetch, setOnSessionExpired } from '../api/client';

export interface AuthContextType {
    isAuthenticated: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void,
    register: (username: string, password: string, confirmPassword: string, email: string) => Promise<void>,
    username: string,
    setUsername: (username: string) => void,
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
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("accessToken"));
    const [username, setUsername] = useState(() => localStorage.getItem("username") || "");

    useEffect(() => {
        setOnSessionExpired(() => {
            setIsAuthenticated(false);
            setUsername("");
        });
    }, []);

    async function login(email: string, password: string) {
        const tokens = await apiFetch<{ access: string; refresh: string }>('/token/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
        localStorage.setItem("accessToken", tokens.access)
        localStorage.setItem("refreshToken", tokens.refresh)
        const userResponse = await apiFetch<{ username: string }>('/username/', {
            method: 'GET',
        });
        localStorage.setItem("username", userResponse.username);
        setUsername(userResponse.username);
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
    }

    async function register(username: string, password: string, confirmPassword: string, email: string) {
        const tokens = await apiFetch<{ access: string; refresh: string }>('/register/', {
            method: 'POST',
            body: JSON.stringify({ username, password, confirmPassword, email }),
        });
        localStorage.setItem("accessToken", tokens.access)
        localStorage.setItem("refreshToken", tokens.refresh)
        const userResponse = await apiFetch<{ username: string }>('/username/', {
            method: 'GET',
        });
        localStorage.setItem("username", userResponse.username);
        setUsername(userResponse.username);
        setIsAuthenticated(true)
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
}