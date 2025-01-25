import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed left-4 bottom-4 z-50 rounded-full bg-primary p-2 text-gray-800 backdrop-blur-sm transition-colors hover:bg-gray-200 dark:bg-gray-800/10 dark:text-gray-200 dark:hover:bg-gray-700/50 "
    >
      {theme === "light" ? (
        <Moon className="text-gray-200 hover:text-gray-800" size={20} />
      ) : (
        <Sun size={20} />
      )}
    </motion.button>
  );
}
