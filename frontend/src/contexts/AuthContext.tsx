import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credential: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credential: SignUpProps) => Promise<void>;
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

type SignUpProps = {
    name: string;
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
    
    useEffect(() => {
        // try get something in token
        const { '@nestauth.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;
                setUser({ id, name, email });
            }).catch(() => {
                // if error, logout the user
                signOut();
            })
        }
    }, []);

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

            toast.success('Login realizado com sucesso!')

            // Redirect user to dashboard
            Router.push('/dashboard');
        } catch (error) {
            toast.error('Erro ao acessar')
            console.log('Access error', error);
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', { name, email, password });
            toast.success('Cadastrado com sucesso');
            Router.push('/');
        } catch (error) {
            toast.error('Erro ao cadastrar');
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            { children }
        </AuthContext.Provider>
    )
}