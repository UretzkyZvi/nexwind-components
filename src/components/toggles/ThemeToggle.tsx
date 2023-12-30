// ThemeToggle.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button onClick={toggleTheme} className="relative">
      <Moon className={`w-6 h-6 transition-all duration-300 ease-in-out text-gray-400  ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
      <Sun className={`w-6 h-6 transition-all duration-300 ease-in-out text-gray-400 absolute top-0 left-0 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
    </button>
  );
};

export default ThemeToggle;
