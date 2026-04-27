import { useState, useEffect } from "react";
import API from "../api/client";

const activityTypes = ["CALL", "MEETING", "TASK", "EMAIL"];

export default function CreateActivityModal({ onClose, onCreated }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        type: "",
        customer_id: "",
        opportunity_id: ""
    });

    const [customers, setCustomers] = useState([]);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const resC = await API.get("/customers/");
            setCustomers(resC.data);
        };

        const fetchOpportunities = async () => {
            const resO = await API.get("/opportunities/");
            setOpportunities(resO.data);
        };
        fetchCustomers();
        fetchOpportunities();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updatedForm = { ...form, [name]: value };

        if (name === "customer_id" && value) {
            updatedForm.opportunity_id = "";
        }
        setForm(updatedForm);
    };

    const handleCreate = async () => {
        console.log("CLICK CREATE");
        if (!form.title) {
            return alert("El titulo es obligatorio")
        }

        if (!form.opportunity_id && !form.customer_id) {
            return alert("La actividad debe estar conectada a una oportunidad o cliente")
        }

        if (form.opportunity_id && form.customer_id) {
            return alert("La actividad no puede estar conectada a una oportunidad y a un cliente")
        }

        try {
            await API.post("/activities/", form)
            onCreated();
            onClose();
        } catch(err) {
            console.error(err);
            alert("Error al crear la actividad.");
        }
    };

    return (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className = "bg-slate-900 p-6 rounded-xl w-96 shadow-lg text-white">

                <h2 className = "text-xl font-bold mb-4">Nueva Actividad</h2>

                <input
                    name = "title"
                    placeholder = "Titulo"
                    className = "w-full mb-3 p-2 bg-slate-800 rounded"
                    onChange = {handleChange}
                />

                <input
                    name = "description"
                    placeholder = "Descripcion"
                    className = "w-full mb-3 p-2 bg-slate-800 rounded"
                    onChange = {handleChange}
                />

                <select 
                    name = "type"
                    className = "w-full mb-4 p-2 bg-slate-800 rounded"
                    onChange = {handleChange}
                >
                    <option value = "">Selecciona un tipo</option>
                    {activityTypes.map((a) => (
                        <option key = {a} value = {a}>
                            {a}
                        </option>
                    ))}
                </select>

                <select
                    name = "customer_id"
                    value = {form.customer_id}
                    className = "w-full mb-4 p-2 bg-slate-800 rounded"
                    onChange = {handleChange}
                >
                    <option value = "">Selecciona un cliente</option>
                    {customers.map((c) => (
                        <option key = {c.id} value = {c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select
                    name = "opportunity_id"
                    className = "w-full mb-4 p-2 bg-slate-800 rounded"
                    value = {form.opportunity_id}
                    onChange = {handleChange}
                >
                    <option value = "">Selecciona una oportunidad</option>
                    {opportunities.map((o) => (
                        <option key = {o.id} value = {o.id}>
                            {o.title}
                        </option>
                    ))}
                </select>

                <div className = "flex justify-end gap-2">
                    <button onClick = {onClose} className = "bg-slate-700 px-4 py-2 rounded">
                        Cancelar
                    </button>

                    <button onClick = {handleCreate} className = "bg-slate-700 px-4 py-2 rounded">
                        Crear
                    </button>
                </div>

            </div>
        </div>
    );
}