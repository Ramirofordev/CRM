import { Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/useTheme";

const titles = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/customers": "Customers",
    "/opportunities": "Pipeline",
    "/activities": "Activities",
};

export default function Navbar() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const title = titles[location.pathname] || "CRM";

    return (
        <header className = "sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60 sm:px-6 lg:px-8">
            <div className = "flex items-center justify-between gap-4">
                <div>
                    <p className = "text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Workspace</p>
                    <h2 className = "text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
                </div>

                <button
                    onClick = {toggleTheme}
                    className = "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-white"
                >
                    {theme === "dark" ? <Sun size = {17} /> : <Moon size = {17} />}
                    <span className = "hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
                </button>
            </div>
        </header>
    );
}
