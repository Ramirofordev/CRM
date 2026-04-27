import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {

    return (
        <div className = "flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className = "flex flex-col flex-1">
                <Navbar />

                <main className = "p-6 text-white">
                    {children}
                </main>
            </div> 
        </div>
    );
}