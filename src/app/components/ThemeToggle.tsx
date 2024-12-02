
"use client";
import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="themeToggle" onClick={toggleTheme}>
      <span>{theme === "light" ? "🌙" : "☀️"}</span>
      <p>{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</p>
    </div>
  );
};

export default ThemeToggle;
