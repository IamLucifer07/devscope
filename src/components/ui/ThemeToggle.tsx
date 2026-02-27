"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Placeholder to prevent layout shift
    }

    // Use resolvedTheme to know actual color scheme when theme is "system"
    const currentTheme = theme === "system" ? resolvedTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-sm"
            aria-label="Toggle theme"
        >
            {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
