import { useEffect, useMemo, useState } from "react";
import themeContext from "./themeContext";
const THEMES = {
    LIGHT: "light",
    DARK: "dark",
};
export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(THEMES.LIGHT);

    useEffect(() => {
        window.document.body.classList.add("theme-" + theme);
        return () => window.document.body.classList.remove("theme-" + theme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            THEMES,
        }),
        [theme, setTheme, THEMES]
    );

    return (
        <themeContext.Provider value={value}>{children}</themeContext.Provider>
    );
}

