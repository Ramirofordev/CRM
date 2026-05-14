import { useState } from "react";
import { Briefcase, CheckSquare, LayoutDashboard, LogOut, PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [collapsed, setCollapsed] = useState(false); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.setItem("sidebar", collapsed);
        navigate("/login");
    };

    return (
        <aside className = {`${collapsed ? "w-20" : "w-72"} sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-200/70 bg-white/75 p-4 shadow-xl shadow-slate-200/70 backdrop-blur-2xl transition-all dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/20 md:flex`}>

            <div className = {`mb-8 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
                {!collapsed && (
                    <div>
                        <p className = "text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-300">Nachito</p>
                        <h1 className = "mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white">CRM OS</h1>
                    </div>
                )}
                <button
                    onClick = {() => setCollapsed(!collapsed)}
                    className = "rounded-2xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:text-indigo-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:text-white"
                >
                    {collapsed ? <PanelLeftOpen size = {18} /> : <PanelLeftClose size = {18} />}
                </button>
            </div>

            <div className = "flex flex-1 flex-col gap-2">
                <NavItem icon = {LayoutDashboard} label = "Dashboard" link = "/dashboard" collapsed = {collapsed} active = {location.pathname === "/" || location.pathname === "/dashboard"} />
                <NavItem icon = {Users} label = "Customers" link = "/customers" collapsed = {collapsed} active = {location.pathname === "/customers"} />
                <NavItem icon = {Briefcase} label = "Opportunities" link = "/opportunities" collapsed = {collapsed} active = {location.pathname === "/opportunities"} />
                <NavItem icon = {CheckSquare} label = "Activities" link = "/activities" collapsed = {collapsed} active = {location.pathname === "/activities"} />

            </div>

            <button className = {`flex items-center justify-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/15 ${collapsed ? "px-0" : ""}`}
                onClick = {handleLogout}
            >
                <LogOut size = {18} />
                {!collapsed && "Logout"}
            </button>
        </aside>
    );
}

export function MobileNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const items = [
        { icon: LayoutDashboard, label: "Home", link: "/dashboard" },
        { icon: Users, label: "Clients", link: "/customers" },
        { icon: Briefcase, label: "Deals", link: "/opportunities" },
        { icon: CheckSquare, label: "Tasks", link: "/activities" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className = "fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-3xl border border-slate-200/80 bg-white/90 p-2 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-black/40 md:hidden">
            {items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.link || (location.pathname === "/" && item.link === "/dashboard");

                return (
                    <Link key = {item.link} to = {item.link} className = {`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-semibold transition ${active ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-slate-400"}`}>
                        <Icon size = {18} />
                        {item.label}
                    </Link>
                );
            })}
            <button onClick = {handleLogout} className = "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-semibold text-rose-500">
                <LogOut size = {18} />
                Exit
            </button>
        </nav>
    );
}

function NavItem({ icon, label, link, collapsed, active }) {
    const IconComponent = icon;

    return (
        <Link
            to = {link}
            className = {`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold transition ${collapsed ? "justify-center" : "gap-3"} ${active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"}`}
        >
            <IconComponent size = {18} />
            {!collapsed && <span>{label}</span>}
        </Link>
    );
}
