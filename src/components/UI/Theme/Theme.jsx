import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Theme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div>
            <button onClick={toggleTheme} className='p-3 rounded-full hover:bg-gray-200 transition-all duration-300 dark:hover:bg-gray-800 hover:shadow-lg hover:shadow-cyan-500/50 '>
                {theme === 'light' ? <Moon size={28} color='#64748b'/> : <Sun color='#ffffff' size={28}/>}
            </button>
        </div>
    );
};

export default Theme;
