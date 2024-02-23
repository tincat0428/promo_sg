import { createContext } from "react";

export const ThemeContext = createContext({
    themeCode: '',
    setThemeCode: () => { },
})