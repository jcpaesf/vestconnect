import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextState {
    user: any;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@VestConnect:token', token);
        localStorage.setItem('@VestConnect:user', JSON.stringify(user));

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@VestConnect:token');
        localStorage.removeItem('@VestConnect:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}