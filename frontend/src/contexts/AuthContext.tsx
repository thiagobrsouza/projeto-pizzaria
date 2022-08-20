import Router from 'next/router';
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { api } from '../services/apiClient';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credential: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch{
        console.log('Logout Error');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user; //se não tiver user, ele converte para false. Se tiver, se torna true
    
    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', { email, password });
            //console.log(response.data);
            const { id, name, token } = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 1 month
                path: '/' // the paths that have access to token
            });
            setUser({ id, name, email });

            // Passar para proximas requisicoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            // Redirect user to dashboard
            Router.push('/dashboard');
        } catch (error) {
            console.log('Access error', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}