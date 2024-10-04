"use client"
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/libs/api';
import toast from 'react-hot-toast';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    update: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        const user = Cookies.get('user');
        if (token) {
            setUser(user ? JSON.parse(user) : null);
        }
        setLoading(false)
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data;
            if (token) {
                Cookies.set('token', token);
                Cookies.set('user', JSON.stringify(user));
                setUser(user);
                router.push('/dashboard/products');
            } else {
                throw new Error();
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Wrong username or password ");
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/auth/login');
    };

    const update = (user: User) => {
        Cookies.set('user', JSON.stringify(user));
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, update, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};