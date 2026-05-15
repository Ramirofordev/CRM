import { useEffect, useState } from "react";
import { activitiesApi, customersApi, opportunitiesApi } from "../api/resources";
import { AlertCircle, Briefcase, Calendar, CheckCircle, Crown, Users } from "lucide-react";
import Badge from "../components/ui/Badge";
import MetricCard from "../components/ui/MetricCard";
import PageHeader from "../components/ui/PageHeader";
import Panel from "../components/ui/Panel";

import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Dashboard() {
    const [activities, setActivities] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        let active = true;

        Promise.all([
            activitiesApi.list(),
            opportunitiesApi.list(),
            customersApi.list()
        ])
            .then(([actRes, oppRes, custRes]) => {
                if (!active) return;
                setActivities(actRes.data);
                setOpportunities(oppRes.data);
                setCustomers(custRes.data);
            })
            .catch((err) => console.error(err));

        return () => {
            active = false;
        };
    }, []);

    const now = new Date();
    const overdue = activities.filter(a => a.due_date && new Date(a.due_date) < now && a.status !== "DONE");
    const today = activities.filter(a => {
        if (!a.due_date) return false;
        return new Date(a.due_date).toDateString() === now.toDateString();
    });
    const pending = activities.filter(a => a.status === "PENDING");
    const done = activities.filter(a => a.status === "DONE");
    const totalValue = opportunities.reduce((acc, o) => acc + (o.value || 0), 0);
    const formattedValue = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(totalValue);

    const pipelineData = ["LEAD", "CONTACTED", "PROPOSAL", "WON", "LOST"].map((status) => ({
        name: status,
        value: opportunities.filter(o => o.status === status).length,
    }));

    const activityData = [
        { name: "Pendientes", value: pending.length },
        { name: "Completadas", value: done.length },
    ];

    const topCustomers = customers
        .map(c => ({ ...c, count: opportunities.filter(o => o.customer_id === c.id).length }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

    const recentActivities = [...activities]
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, 5);

    return (
        <div className = "mx-auto max-w-7xl space-y-8">
            <PageHeader
                title = "Sales command center"
                description = "Una vista ejecutiva de clientes, pipeline y actividades para priorizar el trabajo comercial del día."
            />

            <div className = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard title = "Pipeline" value = {formattedValue} detail = "Valor total abierto" icon = {Briefcase} accent = "violet" />
                <MetricCard title = "Clientes" value = {customers.length} detail = "Cuentas activas" icon = {Users} accent = "blue" />
                <MetricCard title = "Hoy" value = {today.length} detail = "Actividades programadas" icon = {Calendar} accent = "amber" />
                <MetricCard title = "Vencidas" value = {overdue.length} detail = "Requieren atención" icon = {AlertCircle} accent = "rose" />
            </div>

            <div className = "grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <Panel className = "p-6">
                    <div className = "mb-6 flex items-center justify-between">
                        <div>
                            <h2 className = "text-xl font-bold">Pipeline por etapa</h2>
                            <p className = "text-sm text-slate-500 dark:text-slate-400">Distribución actual de oportunidades.</p>
                        </div>
                        <Badge variant = "violet">Live</Badge>
                    </div>
                    <ResponsiveContainer width = "100%" height = {300}>
                        <BarChart data = {pipelineData}>
                            <XAxis dataKey = "name" stroke = "#94a3b8" fontSize = {12} />
                            <YAxis stroke = "#94a3b8" allowDecimals = {false} />
                            <Tooltip cursor = {{ fill: "rgba(99,102,241,0.08)" }} />
                            <Bar dataKey = "value" radius = {[10, 10, 0, 0]} fill = "#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>

                <Panel className = "p-6">
                    <div className = "mb-6">
                        <h2 className = "text-xl font-bold">Estado de actividades</h2>
                        <p className = "text-sm text-slate-500 dark:text-slate-400">Avance del seguimiento diario.</p>
                    </div>
                    <ResponsiveContainer width = "100%" height = {260}>
                        <PieChart>
                            <Pie data = {activityData} dataKey = "value" nameKey = "name" innerRadius = {58} outerRadius = {92} paddingAngle = {6}>
                                <Cell fill = "#f59e0b" />
                                <Cell fill = "#10b981" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className = "grid grid-cols-2 gap-3">
                        <Badge variant = "amber">Pendientes {pending.length}</Badge>
                        <Badge variant = "green">Done {done.length}</Badge>
                    </div>
                </Panel>
            </div>

            <div className = "grid gap-6 lg:grid-cols-2">
                <Panel className = "p-6">
                    <div className = "mb-5 flex items-center gap-3">
                        <Crown className = "text-amber-500" size = {20} />
                        <h2 className = "text-xl font-bold">Top clientes</h2>
                    </div>
                    <div className = "space-y-3">
                        {topCustomers.length === 0 && <p className = "text-sm text-slate-500 dark:text-slate-400">Todavía no hay clientes con oportunidades.</p>}
                        {topCustomers.map((customer, index) => (
                            <div key = {customer.id} className = "flex items-center justify-between rounded-2xl bg-slate-100/80 p-4 dark:bg-white/5">
                                <div>
                                    <p className = "font-semibold">{customer.name}</p>
                                    <p className = "text-xs text-slate-500 dark:text-slate-400">{customer.email}</p>
                                </div>
                                <Badge variant = {index === 0 ? "amber" : "neutral"}>{customer.count} oportunidades</Badge>
                            </div>
                        ))}
                    </div>
                </Panel>

                <Panel className = "p-6">
                    <div className = "mb-5 flex items-center gap-3">
                        <CheckCircle className = "text-emerald-500" size = {20} />
                        <h2 className = "text-xl font-bold">Actividad reciente</h2>
                    </div>
                    <div className = "space-y-3">
                        {recentActivities.length === 0 && <p className = "text-sm text-slate-500 dark:text-slate-400">No hay actividades registradas.</p>}
                        {recentActivities.map((activity) => (
                            <div key = {activity.id} className = "flex items-center justify-between rounded-2xl bg-slate-100/80 p-4 dark:bg-white/5">
                                <div>
                                    <p className = "font-semibold">{activity.title}</p>
                                    <p className = "text-xs text-slate-500 dark:text-slate-400">{activity.type || "TASK"}</p>
                                </div>
                                <Badge variant = {activity.status === "DONE" ? "green" : "blue"}>{activity.status}</Badge>
                            </div>
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    );
}
