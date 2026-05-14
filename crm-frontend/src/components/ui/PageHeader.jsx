export default function PageHeader({ title, description, action }) {
    return (
        <div className = "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className = "mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-300">
                    CRM Workspace
                </p>
                <h1 className = "text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className = "mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
