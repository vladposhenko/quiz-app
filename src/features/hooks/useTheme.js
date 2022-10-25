import { useContext } from "react";
import themeContext from "../context/themeContext";

export default function useTheme() {
    const value = useContext(themeContext);

    if (value === null) {
        console.error("You should use this hook only inside ThemeProvider");
    }

    return value;
}