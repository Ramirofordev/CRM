import { useEffect, useState } from "react";
import { activitiesApi } from "../api/resources";
import { CalendarClock, CheckCircle2, Clock, Plus } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Panel from "../components/ui/Panel";
import CreateActivityModal from "../components/CreateActivityModal.jsx";
import EditActivityModal from "../components/EditActivityModal.jsx";

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const fetchActivities = async () => {
        try {
            const res = await activitiesApi.list();
            setActivities(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Eliminar actividad?")) return;

        await activitiesApi.remove(id);
        fetchActivities();
    };

    const now = new Date();
    const isSameDay = (d1, d2) => d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    const overdue = [];
    const today = [];
    const upcoming = [];
    const noDate = [];
    const done = activities.filter(a => a.status === "DONE");

    activities.forEach(a => {
        if (a.status === "DONE") return;
        if (!a.due_date) {
            noDate.push(a);
            return;
        }

        const due = new Date(a.due_date);
        if (due < now) overdue.push(a);
        else if (isSameDay(due, now)) today.push(a);
        else upcoming.push(a);
    });

    useEffect(() => {
        let active = true;

        activitiesApi.list()
            .then((res) => {
                if (active) setActivities(res.data);
            })
            .catch((err) => console.error(err));

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className = "mx-auto max-w-7xl space-y-8">
            <PageHeader
                title = "Activities"
                description = "Organiza llamadas, reuniones y tareas para no perder ningún seguimiento importante."
                action = {
                    <Button onClick = {() => setShowModal(true)}>
                        <Plus size = {18} /> Nueva Actividad
                    </Button>
                }
            />

            <div className = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title = "Vencidas" value = {overdue.length} variant = "rose" icon = {Clock} />
                <SummaryCard title = "Hoy" value = {today.length} variant = "amber" icon = {CalendarClock} />
                <SummaryCard title = "Próximas" value = {upcoming.length} variant = "blue" icon = {CalendarClock} />
                <SummaryCard title = "Completadas" value = {done.length} variant = "green" icon = {CheckCircle2} />
            </div>

            <div className = "grid gap-6 xl:grid-cols-2">
                <Section title = "Vencidas" items = {overdue} variant = "rose" onDelete = {handleDelete} onEdit = {setSelectedActivity} onRefresh = {fetchActivities} />
                <Section title = "Hoy" items = {today} variant = "amber" onDelete = {handleDelete} onEdit = {setSelectedActivity} onRefresh = {fetchActivities} />
                <Section title = "Próximas" items = {upcoming} variant = "blue" onDelete = {handleDelete} onEdit = {setSelectedActivity} onRefresh = {fetchActivities} />
                <Section title = "Sin fecha" items = {noDate} variant = "neutral" onDelete = {handleDelete} onEdit = {setSelectedActivity} onRefresh = {fetchActivities} />
                <Section title = "Completadas" items = {done} variant = "green" onDelete = {handleDelete} onEdit = {setSelectedActivity} onRefresh = {fetchActivities} />
            </div>

            {showModal && <CreateActivityModal onClose = {() => setShowModal(false)} onCreated = {fetchActivities} />}
            {selectedActivity && <EditActivityModal activity = {selectedActivity} onClose = {() => setSelectedActivity(null)} onUpdated = {fetchActivities} />}
        </div>
    );
}

function SummaryCard({ title, value, variant, icon }) {
    const IconComponent = icon;

    return (
        <Panel className = "p-5">
            <div className = "flex items-center justify-between">
                <div>
                    <p className = "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{title}</p>
                    <p className = "mt-2 text-3xl font-bold">{value}</p>
                </div>
                <Badge variant = {variant}><IconComponent size = {15} /></Badge>
            </div>
        </Panel>
    );
}

function ActivityCard({ activity, onDelete, onEdit, onRefresh }){
    const isLate = activity.due_date && new Date(activity.due_date) < new Date() && activity.status !== "DONE";

    return (
        <div className = "rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-black/20">
            <div className = "mb-3 flex items-start justify-between gap-3">
                <div>
                    <p className = "font-bold text-slate-950 dark:text-white">{activity.title}</p>
                    <p className = "mt-1 text-sm text-slate-500 dark:text-slate-400">{activity.description || "Sin descripción"}</p>
                </div>
                <Badge variant = {activity.status === "DONE" ? "green" : "blue"}>{activity.type || "TASK"}</Badge>
            </div>

            <div className = "mb-4 flex items-center justify-between text-sm">
                <span className = {isLate ? "font-semibold text-rose-500" : "text-slate-500 dark:text-slate-400"}>
                    {activity.due_date ? new Date(activity.due_date).toLocaleDateString() : "Sin fecha"}
                </span>
                <label className = "flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Done
                    <input
                        type = "checkbox"
                        checked = {activity.status === "DONE"}
                        onChange = {async (e) => {
                            const newStatus = e.target.checked ? "DONE": "PENDING";
                            try {
                                await activitiesApi.updateStatus(activity.id, newStatus);
                                onRefresh();
                            } catch (err) {
                                console.error("Error updating status", err);
                            }
                        }}
                        className = "h-4 w-4 accent-indigo-600"
                    />
                </label>
            </div>

            <div className = "flex gap-2">
                <Button variant = "secondary" className = "flex-1 px-3 py-2" onClick = {() => onEdit(activity)}>Editar</Button>
                <Button variant = "danger" className = "flex-1 px-3 py-2" onClick = {() => onDelete(activity.id)}>Eliminar</Button>
            </div>
        </div>
    );
}

function Section({ title, items, variant, onDelete, onEdit, onRefresh }) {
    return (
        <Panel className = "p-5">
            <div className = "mb-4 flex items-center justify-between">
                <h2 className = "text-lg font-bold">{title}</h2>
                <Badge variant = {variant}>{items.length}</Badge>
            </div>
            <div className = "space-y-3">
                {items.length === 0 && <p className = "rounded-2xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-400 dark:border-white/10">Sin actividades</p>}
                {items.map(activity => (
                    <ActivityCard key = {activity.id} activity = {activity} onDelete = {onDelete} onEdit = {onEdit} onRefresh = {onRefresh} />
                ))}
            </div>
        </Panel>
    );
}
