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
        // setCommentTheme(theme)
    }, [theme]);

    const setCommentTheme = (theme: string) => {
        if (document.querySelector('.utterances-frame')) {
            const commentTheme = theme === 'dark' ? 'gruvbox-dark' : 'github-light'
            const message = {
                type: 'set-theme',
                theme: commentTheme
            };
            const iframe = document.querySelector('.utterances-frame');
            iframe?.contentWindow?.postMessage(message, 'https://utteranc.es');
        }
    }
    const togglePreference = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        setCommentTheme(newTheme)
    }

    return (
        <div className='cursor-pointer' onClick={togglePreference}>
            {
                theme === 'dark' ? <div className='i-carbon-moon'></div> : <div className='i-carbon-sun'></div>
            }
        </div>
    )
}

export default ThemeSwitch
