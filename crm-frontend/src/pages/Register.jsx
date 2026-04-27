import { useState } from "react";
import API from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", {
                email,
                password
            });

            alert("Usuario creado");
            navigate("/login");
        } catch (err) {
            alert("Error al registrarse");
        }
    };

    return (
        <div className = "h-screen flex items-center justify-center bg-slate-950 text-white">
            <div className = "bg-slate-900 p-8 rounded-xl w-80 shadow-lg">

                <h2 className = "text-2xl mb-6 font-bold text-center">Register</h2>

                <input
                    className = "w-full mb-4 p-2 rounded bg-slate-800"
                    placeholder = "Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type = "password"
                    className = "w-full mb-4 p-2 rounded bg-slate-800"
                    placeholder = "Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className = "w-full bg-green-500 p-2 rounded hover:bg-green-600"
                >
                    Register
                </button>

                <p className = "text-sm mt-4 text-center text-slate-400">
                    Ya tienes cuenta?{" "}
                    <Link to ="/login" className = "text-blue-400 hover:underline">
                        Inicia Sesion
                    </Link>
                </p>
            </div>
        </div>
    );
}