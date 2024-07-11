"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

// const { createContext, useContext, useState, useEffect } = require("react");

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [currentTheme, setCurrentTheme] = useState(null);

//   useEffect(() => {
//     if (currentTheme === null) {
//       if (
//         window.matchMedia &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches
//       ) {
//         setCurrentTheme("dark");
//         localStorage.setItem("theme", "dark");
//       } else {
//         setCurrentTheme("light");
//         localStorage.setItem("theme", "light");
//       }
//     }

//     if (typeof window !== "undefined") {
//       const localTheme = localStorage.getItem("theme");
//       if (localTheme) {
//         setCurrentTheme(localTheme);
//       }
//     }
//     document.querySelector("html")?.setAttribute("data-theme", currentTheme);
//   }, [currentTheme]);

//   const toggleTheme = (theme) => {
//     setCurrentTheme(theme);
//     localStorage.setItem("theme", theme);
//     document.querySelector("html")?.setAttribute("data-theme", theme);
//   };
//   return (
//     <ThemeContext.Provider
//       value={{
//         currentTheme,
//         toggleTheme,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeContext = () => useContext(ThemeContext);
