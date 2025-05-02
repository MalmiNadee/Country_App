import React, { createContext, useState, useEffect } from "react";

//context for manage theme(light/dark) across application
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  //get saved theme from localStorage or use default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  //switch between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //save theme to localStorage and apply to document element
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export {ThemeContext};
