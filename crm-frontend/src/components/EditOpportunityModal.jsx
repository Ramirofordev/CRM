import { useState, useEffect } from "react";
import API from "../api/client";

export default function EditOpportunityModal({ opportunity, onClose, onUpdated }) {
    const [form, setForm] = useState(opportunity);

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (opportunity) {
            setForm(opportunity);
        }
    }, [opportunity]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const res = await API.get("/customers/");
            setCustomers(res.data);
        };
        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        if (!form.title || !form.customer_id) {
            return alert("Titulo y cliente obligatorios");
        }

        try {
            await API.put(`/opportunities/${opportunity.id}`, form);
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al actualizar");
        }
    };

    if (!form) return null;
    
    return (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className = "bg-slate-900 p-6 rounded-xl w-96 text-white">

                <h2 className = "text-xl font-bold mb-4">Editar Oportunidad</h2>

                <input name = "title" value = {form.title} onChange = {handleChange}
                    className = "w-full mb-3 p-2 bg-slate-800 rounded" />

                <input name = "value" value = {form.value} onChange = {handleChange}
                    className = "w-full mb-3 p-2 bg-slate-800 rounded" />
                
                <select 
                    name = "customer_id"
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

                <div className = "flex justify-end gap-2">
                    <button onClick = {onClose} className = "bg-slate-700 px-4 py-2 rounded">
                        Cancelar
                    </button>

                    <button onClick = {handleUpdate}
                        className = "bg-blue-500 px-4 py-2 rounded">
                            Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}