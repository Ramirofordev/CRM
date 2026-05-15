const variants = {
    primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15",
    danger: "bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500",
    ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10",
};

export default function Button({ children, className = "", variant = "primary", ...props }) {
    return (
        <button
            className = {`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
