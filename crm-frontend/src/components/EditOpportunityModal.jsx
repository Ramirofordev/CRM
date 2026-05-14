import { useEffect, useState } from "react";
import { customersApi, opportunitiesApi } from "../api/resources";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";

export default function EditOpportunityModal({ opportunity, onClose, onUpdated }) {
    const [form, setForm] = useState(opportunity);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customersApi.list().then((res) => setCustomers(res.data)).catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!form.title || !form.customer_id) return alert("Titulo y cliente obligatorios");

        try {
            await opportunitiesApi.update(opportunity.id, { ...form, value: Number(form.value) });
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al actualizar");
        }
    };

    if (!form) return null;
    
    return (
        <ModalShell title = "Editar Oportunidad" onClose = {onClose} footer = {<><Button variant = "secondary" onClick = {onClose}>Cancelar</Button><Button onClick = {handleUpdate}>Guardar</Button></>}>
            <input name = "title" value = {form.title} onChange = {handleChange} className = "app-input" />
            <input name = "value" type = "number" value = {form.value} onChange = {handleChange} className = "app-input" />
            <select name = "customer_id" value = {form.customer_id} className = "app-input" onChange = {handleChange}>
                <option value = "">Selecciona un cliente</option>
                {customers.map((customer) => <option key = {customer.id} value = {customer.id}>{customer.name}</option>)}
            </select>
        </ModalShell>
    );
}
