import { useState } from "react";
import { customersApi } from "../api/resources";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";

export default function EditCustomerModal({ customer, onClose, onUpdated }) {
    const [form, setForm] = useState(customer);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await customersApi.update(customer.id, form);
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al actualizar");
        }
    };

    return (
        <ModalShell
            title = "Editar Cliente"
            onClose = {onClose}
            footer = {<><Button variant = "secondary" onClick = {onClose}>Cancelar</Button><Button onClick = {handleUpdate}>Guardar</Button></>}
        >
            <input name = "name" value = {form.name} onChange = {handleChange} className = "app-input" />
            <input name = "email" value = {form.email} onChange = {handleChange} className = "app-input" />
            <input name = "phone" value = {form.phone || ""} onChange = {handleChange} className = "app-input" />
            <input name = "address" value = {form.address || ""} onChange = {handleChange} className = "app-input" />
        </ModalShell>
    );
}
