const variants = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10",
    blue: "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-400/20",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/20",
    amber: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/20",
    rose: "bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-400/20",
    violet: "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-400/20",
};

export default function Badge({ children, className = "", variant = "neutral" }) {
    return (
        <span className = {`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
