"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button, Flex } from '@/components/ui/RadixTheme';
import { motion } from 'framer-motion';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // only show the switcher after it's been mounted to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (!mounted) return null;

    return (
        <Button 
            onClick={toggleTheme}
            variant="ghost"
            size="3"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <Flex align="center" justify="center">
                {theme === 'dark' ? (
                    <motion.svg 
                        key="sun"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24"
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                            fill="currentColor" 
                        />
                        <path 
                            d="M12 1V3M12 21V23M1 12H3M21 12H23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M18.36 5.64L19.78 4.22M4.22 19.78L5.64 18.36" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                        />
                    </motion.svg>
                ) : (
                    <motion.svg 
                        key="moon"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
                            fill="currentColor" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </motion.svg>
                )}
            </Flex>
        </Button>
    );
};

export default ThemeSwitcher;
