import { createContext } from 'react';

export interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

export interface ITheme {
    title: string;

    colors: {
        corImg: string;

        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    }
}

export interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export { AuthContext, ThemeContext }