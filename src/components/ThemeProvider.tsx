import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => { } });

export const useTheme = () => useContext(ThemeContext);

function getSystemTheme(): Theme {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function getInitialTheme(): Theme {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('ezzcode-theme');
        if (stored === 'light' || stored === 'dark') return stored;
    }
    return getSystemTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('ezzcode-theme', theme);
    }, [theme]);

    // Listen for system theme changes (only if user hasn't manually set)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            const stored = localStorage.getItem('ezzcode-theme');
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
