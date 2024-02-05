import { createContext } from "react";

interface ThemeContext {
    cor: string
}

const themeDark: ThemeContext = {
    cor: "dark"
};
const themeLight: ThemeContext = {
    cor: "light"
};

const ThemeProvider = createContext(themeDark);

export default ThemeProvider
export {themeDark, themeLight, type ThemeContext}