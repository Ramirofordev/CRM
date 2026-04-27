import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className = "w-64 h-screen bg-slate-900 text-white flex flex-col p-4">

            <h1 className = "text-2xl font-bold mb-8">CRM</h1>

            <nav className = "flex flex-col gap-3">
                <Link to = "/" className = "hover:bg-slate-700 p-2 rounded">
                    Dashboard
                </Link>

                <Link to = "/customers" className = "hover:bg-slate-700 p-2 rounded">
                    Customers
                </Link>
                
                <Link to = "/opportunities">Opportunities</Link>

                <Link to = "/activities">Activities</Link>
            </nav>

            <button 
                onClick = {handleLogout}
                className = "mt-auto bg-red-500 p-2 rounded hover:bg-red-600">
                Logout
            </button>
        </div>
    );
}