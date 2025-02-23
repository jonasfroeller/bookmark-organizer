"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@radix-ui/themes';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>  
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
    );
};

export default ThemeSwitcher;
