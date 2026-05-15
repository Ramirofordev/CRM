import Button from "./Button";

export default function ModalShell({ title, children, onClose, footer }) {
    return (
        <div className = "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className = "app-surface max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 text-slate-950 dark:text-white">
                <div className = "mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className = "text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">Formulario</p>
                        <h2 className = "mt-2 text-2xl font-bold">{title}</h2>
                    </div>
                    <Button type = "button" variant = "ghost" onClick = {onClose} className = "px-3">
                        Cerrar
                    </Button>
                </div>
                <div className = "space-y-4">
                    {children}
                </div>
                {footer && <div className = "mt-6 flex justify-end gap-3">{footer}</div>}
            </div>
        </div>
    );
}
