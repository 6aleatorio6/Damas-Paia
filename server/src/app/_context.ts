import { CSSProperties } from "react";

interface ThemeContext {
    cor: string
}

const themeDark: ThemeContext = {
    cor: "dark"
};
const themeLight: ThemeContext = {
    cor: "light"
};

// temporario
const styleTheme:CSSProperties = {
    backgroundColor: "#afcccc"
}


export { styleTheme}


