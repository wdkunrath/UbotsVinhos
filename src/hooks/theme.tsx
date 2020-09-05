import React, { useState, useContext } from 'react';
import { IThemeContext, ITheme, ThemeContext} from '../interfaces/IHooks';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';


const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem('@vinho:theme');

        if(themeSaved) {
            return JSON.parse(themeSaved);
        }else{
            return dark;
        }
    });

    const toggleTheme = () => {
        if(theme.title === 'dark'){
            setTheme(light);
            localStorage.setItem('@vinho:theme', JSON.stringify(light));
        }else{
            setTheme(dark);
            localStorage.setItem('@vinho:theme', JSON.stringify(dark));
        }
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}

function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);

    return context;
}


export { ThemeProvider, useTheme };
