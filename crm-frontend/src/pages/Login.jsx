import { useState } from "react";
import API from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.access_token);
            navigate("/");
        } catch (err) {
            alert("Credenciales incorrectas");
        }
    };

    console.log("ProtectedRoute render");

    return (
        <div className = "h-screen flex items-center justify-center bg-slate-950 text-white">
            <div className = "bg-slate-900 p-8 rounded-xl w-80 shadow-lg">

                <h2 className = "text-2xl mb-6 font-bold text-center">Login</h2>

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
                    onClick={handleLogin}
                    className = "w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>

                <p className = "text-sm mt-4 text-center text-slate-400">
                    No tienes cuenta?{" "}
                    <Link to ="/register" className = "text-blue-400 hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}