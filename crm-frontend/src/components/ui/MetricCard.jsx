import Panel from "./Panel";

const accents = {
    blue: "from-blue-500/20 to-cyan-500/5 text-blue-600 dark:text-blue-200",
    violet: "from-violet-500/20 to-fuchsia-500/5 text-violet-600 dark:text-violet-200",
    green: "from-emerald-500/20 to-teal-500/5 text-emerald-600 dark:text-emerald-200",
    amber: "from-amber-500/20 to-orange-500/5 text-amber-600 dark:text-amber-200",
    rose: "from-rose-500/20 to-pink-500/5 text-rose-600 dark:text-rose-200",
};

export default function MetricCard({ title, value, detail, icon: Icon, accent = "blue" }) {
    return (
        <Panel className = {`overflow-hidden bg-gradient-to-br p-5 ${accents[accent]}`}>
            <div className = "flex items-start justify-between gap-4">
                <div>
                    <p className = "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {title}
                    </p>
                    <p className = "mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                        {value}
                    </p>
                    {detail && <p className = "mt-2 text-xs text-slate-500 dark:text-slate-400">{detail}</p>}
                </div>
                {Icon && (
                    <div className = "rounded-2xl bg-white/70 p-3 shadow-sm dark:bg-white/10">
                        <Icon size = {20} />
                    </div>
                )}
            </div>
        </Panel>
    );
}
