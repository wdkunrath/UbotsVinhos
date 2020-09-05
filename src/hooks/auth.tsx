import React, { useState, useContext } from 'react';
import { IAuthContext, AuthContext} from '../interfaces/IHooks';

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@vinhos:logged');

        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if(email === 'vinhos@email.com' && password === '123'){
            localStorage.setItem('@vinhos:logged', 'true');
            setLogged(true);
        }else{
            alert('Senha ou usuário inválidos!');
        }
    }

    const signOut = () => {
        localStorage.removeItem('@vinhos:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };