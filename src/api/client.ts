const BASE_URL = import.meta.env.VITE_API_URL;

let refreshPromise: Promise<string> | null = null;
let onSessionExpired: (() => void) | null = null;

export function setOnSessionExpired(callback: () => void) {
    onSessionExpired = callback;
}

async function refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        onSessionExpired?.();
        throw new Error("Session expired. Please log in again.");
    }

    const response = await fetch(`${BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        onSessionExpired?.();
        throw new Error("Session expired. Please log in again.");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    return data.access;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}, isRetry = false): Promise<T> {
    const token = localStorage.getItem("accessToken");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    const isAuthEndpoint = path === "/token/" || path === "/token/refresh/";
    if (response.status === 401 && !isRetry && !isAuthEndpoint) {
        if (!refreshPromise) {
            refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null; });
        }
        await refreshPromise;
        return apiFetch<T>(path, options, true);
    }

    if (!response.ok) {
        const errorBody: any = await response.json().catch(() => null);
        const message =
            errorBody?.detail ??
            errorBody?.nonFieldErrors?.[0] ??
            (Object.values(errorBody ?? {}) as any[])[0]?.[0] ??
            `API error: ${response.status}`;
        throw new Error(message);
    }

    return response.json();
}

