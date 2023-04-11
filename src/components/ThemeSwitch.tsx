import React, { useEffect, useState } from 'react'

const ThemeSwitch = () => {
    const [theme, setTheme] = useState(() => {
        if (import.meta.env.SSR) {
            return undefined;
        }
        if (typeof localStorage !== undefined && localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (!theme) return
        root.setAttribute('data-theme', theme);
    }, [theme]);

    const togglePreference = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <div onClick={togglePreference}>
            {
                theme === 'dark' ? <div className='i-carbon-moon'></div> : <div className='i-carbon-sun'></div>
            }
        </div>
    )
}

export default ThemeSwitch
