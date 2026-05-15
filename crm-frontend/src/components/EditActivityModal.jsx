import { useEffect, useState } from "react";
import { activitiesApi, customersApi, opportunitiesApi } from "../api/resources";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";

const activityTypes = ["CALL", "MEETING", "TASK", "EMAIL"];

export default function EditActivityModal({ activity, onClose, onUpdated }) {
    const [form, setForm] = useState(activity);
    const [customers, setCustomers] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [dueDate, setDueDate] = useState(activity.due_date ? activity.due_date.split("T")[0]: "");

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

    const handleUpdate = async () => {
        if (!form.title) return alert("El titulo es obligatorio");
        if (!form.customer_id && !form.opportunity_id) return alert("La actividad debe estar conectad a un cliente o oportunidad");
        if (form.customer_id && form.opportunity_id) return alert("La actividad no puede estar conectada a una oportunidad y a un cliente");

        const payload = {
            title: form.title,
            description: form.description || null,
            due_date: dueDate ? new Date(dueDate).toISOString(): null,
            ...(form.status ? { status: form.status } : {}),
            ...(form.type ? { type: form.type } : {}),
            ...(form.customer_id ? { customer_id: form.customer_id } : {}),
            ...(form.opportunity_id ? { opportunity_id: form.opportunity_id } : {}),
        };

        try {
            await activitiesApi.update(activity.id, payload);
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al actualizar");
        }
    };
    
    if (!form) return null;

    return (
        <ModalShell title = "Editar Actividad" onClose = {onClose} footer = {<><Button variant = "secondary" onClick = {onClose}>Cancelar</Button><Button onClick = {handleUpdate}>Guardar</Button></>}>
            <input name = "title" value = {form.title} onChange = {handleChange} className = "app-input" />
            <input name = "description" value = {form.description || ""} onChange = {handleChange} className = "app-input" />
            <input type = "date" value = {dueDate} onChange = {(e) => setDueDate(e.target.value)} className = "app-input" />
            <select name = "type" value = {form.type || ""} className = "app-input" onChange = {handleChange}>
                <option value = "">Selecciona un tipo</option>
                {activityTypes.map((activityType) => <option key = {activityType} value = {activityType}>{activityType}</option>)}
            </select>
            <select name = "customer_id" value = {form.customer_id || ""} className = "app-input" onChange = {handleChange}>
                <option value = "">Selecciona un cliente</option>
                {customers.map((customer) => <option key = {customer.id} value = {customer.id}>{customer.name}</option>)}
            </select>
            <select name = "opportunity_id" className = "app-input" value = {form.opportunity_id || ""} onChange = {handleChange}>
                <option value = "">Selecciona una oportunidad</option>
                {opportunities.map((opportunity) => <option key = {opportunity.id} value = {opportunity.id}>{opportunity.title}</option>)}
            </select>
        </ModalShell>
    );
}
