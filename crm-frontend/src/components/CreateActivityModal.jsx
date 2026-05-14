import { useEffect, useState } from "react";
import { activitiesApi, customersApi, opportunitiesApi } from "../api/resources";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";

const activityTypes = ["CALL", "MEETING", "TASK", "EMAIL"];

export default function CreateActivityModal({ onClose, onCreated }) {
    const [form, setForm] = useState({ title: "", description: "", type: "", customer_id: "", opportunity_id: "" });
    const [dueDate, setDueDate] = useState("");
    const [customers, setCustomers] = useState([]);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        customersApi.list().then((res) => setCustomers(res.data)).catch((err) => console.error(err));
        opportunitiesApi.list().then((res) => setOpportunities(res.data)).catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };

        if (name === "customer_id" && value) updatedForm.opportunity_id = "";
        if (name === "opportunity_id" && value) updatedForm.customer_id = "";

        setForm(updatedForm);
    };

    const handleCreate = async () => {
        if (!form.title) return alert("El titulo es obligatorio")
        if (!form.opportunity_id && !form.customer_id) return alert("La actividad debe estar conectada a una oportunidad o cliente")
        if (form.opportunity_id && form.customer_id) return alert("La actividad no puede estar conectada a una oportunidad y a un cliente")

        try {
            await activitiesApi.create({ ...form, due_date: dueDate ? new Date(dueDate).toISOString(): null });
            onCreated();
            onClose();
        } catch(err) {
            console.error(err);
            alert("Error al crear la actividad.");
        }
    };

    return (
        <ModalShell title = "Nueva Actividad" onClose = {onClose} footer = {<><Button variant = "secondary" onClick = {onClose}>Cancelar</Button><Button onClick = {handleCreate}>Crear</Button></>}>
            <input name = "title" placeholder = "Titulo" className = "app-input" onChange = {handleChange} />
            <input name = "description" placeholder = "Descripcion" className = "app-input" onChange = {handleChange} />
            <input type = "date" value = {dueDate} onChange = {(e) => setDueDate(e.target.value)} className = "app-input" />
            <select name = "type" className = "app-input" onChange = {handleChange}>
                <option value = "">Selecciona un tipo</option>
                {activityTypes.map((activity) => <option key = {activity} value = {activity}>{activity}</option>)}
            </select>
            <select name = "customer_id" value = {form.customer_id} className = "app-input" onChange = {handleChange}>
                <option value = "">Selecciona un cliente</option>
                {customers.map((customer) => <option key = {customer.id} value = {customer.id}>{customer.name}</option>)}
            </select>
            <select name = "opportunity_id" className = "app-input" value = {form.opportunity_id} onChange = {handleChange}>
                <option value = "">Selecciona una oportunidad</option>
                {opportunities.map((opportunity) => <option key = {opportunity.id} value = {opportunity.id}>{opportunity.title}</option>)}
            </select>
        </ModalShell>
    );
}
