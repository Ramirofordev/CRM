import Sidebar, { MobileNav } from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {

    return (
        <div className = "flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.16),transparent_34%),linear-gradient(135deg,#f8fafc,#eef2ff_45%,#f8fafc)] dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.26),transparent_32%),linear-gradient(135deg,#020617,#0f172a_48%,#111827)]">

            <Sidebar />

            <div className = "flex min-w-0 flex-1 flex-col">
                <Navbar />

                <main className = "flex-1 overflow-y-auto px-4 pb-28 pt-6 text-slate-950 dark:text-white sm:px-6 md:pb-6 lg:px-8">
                    {children}
                </main>
            </div> 

            <MobileNav />
        </div>
    );
}
