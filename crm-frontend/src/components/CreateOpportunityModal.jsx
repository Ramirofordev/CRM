import { useEffect, useState } from "react";
import { customersApi, opportunitiesApi } from "../api/resources";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";

export default function CreateOpportunityModal({ onClose, onCreated }) {
    const [form, setForm] = useState({ title: "", value: 0, customer_id: "" });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customersApi.list().then((res) => setCustomers(res.data)).catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        if (!form.title || !form.customer_id) return alert("Titulo y cliente obligatorios");

        try {
            await opportunitiesApi.create({ ...form, value: Number(form.value) });
            onCreated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al creare oportunidad")
        }
    };

    return (
        <ModalShell title = "Nueva Oportunidad" onClose = {onClose} footer = {<><Button variant = "secondary" onClick = {onClose}>Cancelar</Button><Button onClick = {handleCreate}>Crear</Button></>}>
            <input name = "title" placeholder = "Título" className = "app-input" onChange = {handleChange} />
            <input name = "value" type = "number" placeholder = "Valor (€)" className = "app-input" onChange = {handleChange} />
            <select name = "customer_id" className = "app-input" onChange = {handleChange}>
                <option value = "">Selecciona un cliente</option>
                {customers.map((customer) => <option key = {customer.id} value = {customer.id}>{customer.name}</option>)}
            </select>
        </ModalShell>
    );
}
