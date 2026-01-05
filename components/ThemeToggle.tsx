"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Sekitar Effect setState warning atau Hydration mismatch error (ini Effect setState warning)
    // hapus comment di bawah untuk mencari tahu apa error nya (Lebih ke warning sih menurut saya mah)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsDarkMode(localStorage.getItem("theme") == "dark");
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, mounted]);


  if (!mounted) return null;

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      aria-label="Toggle theme"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "p-3 rounded-full shadow-lg",
        "bg-primary text-primary-foreground",
        "transition-all duration-300",
        "hover:scale-110 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "max-sm:hidden"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
