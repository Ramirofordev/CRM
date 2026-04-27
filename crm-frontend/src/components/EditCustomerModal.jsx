import { useState } from "react";
import API from "../api/client";

export default function EditCustomerModal({ customer, onClose, onUpdated }) {
    const [form, setForm] = useState(customer);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/customers/${customer.id}`, form);
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al actualizar");
        }
    };

    return (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className = "bg-slate-900 p-6 rounded-xl w-96 text-white">

                <h2 className = "text-xl font-bold mb-4">Editar Cliente</h2>

                <input name = "name" value = {form.name} onChange = {handleChange}
                    className = "w-full mb-3 p-2 bg-slate-800 rounded" />

                <input name = "email" value = {form.email} onChange = {handleChange}
                    className = "w-full mb-3 p-2 bg-slate-800 rounded" />
                
                <input name = "phone" value = {form.phone || ""} onChange = {handleChange}
                    className = "w-full mb-3 p-2 bg-slate-800 rounded" />
                
                <input name = "address" value = {form.address || ""} onChange = {handleChange}
                    className = "w-full mb-4 p-2 bg-slate-800 rounded" />

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