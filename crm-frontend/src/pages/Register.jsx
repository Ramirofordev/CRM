import { useState } from "react";
import { authApi } from "../api/resources";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Button from "../components/ui/Button";
import { useTheme } from "../context/useTheme";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleRegister = async () => {
        try {
            await authApi.register({ email, password });
            alert("Usuario creado");
            navigate("/login");
        } catch {
            alert("Error al registrarse");
        }
    };

    return (
        <div className = "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.20),transparent_34%),linear-gradient(135deg,#f8fafc,#eef2ff_45%,#f8fafc)] p-4 text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.30),transparent_32%),linear-gradient(135deg,#020617,#0f172a_48%,#111827)] dark:text-white">
            <div className = "mx-auto flex min-h-screen max-w-6xl items-center justify-center">
                <div className = "app-surface w-full max-w-md rounded-[2rem] p-8">
                    <div className = "mb-8 flex items-center justify-between">
                        <div>
                            <p className = "text-sm font-semibold text-indigo-600 dark:text-indigo-300">Crear workspace</p>
                            <h2 className = "text-3xl font-bold">Register</h2>
                        </div>
                        <button onClick = {toggleTheme} className = "rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/10">
                            {theme === "dark" ? <Sun size = {18} /> : <Moon size = {18} />}
                        </button>
                    </div>

                    <div className = "space-y-4">
                        <input className = "app-input" placeholder = "Email" value = {email} onChange = {(e) => setEmail(e.target.value)} />
                        <input type = "password" className = "app-input" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)} />
                        <Button onClick = {handleRegister} className = "w-full">Crear cuenta</Button>
                    </div>

                    <p className = "mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Ya tienes cuenta? <Link to = "/login" className = "font-semibold text-indigo-600 hover:underline dark:text-indigo-300">Inicia Sesion</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
