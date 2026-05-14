import { useState } from "react";
import { customersApi } from "../api/resources";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";

export default function CreateCustomerModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.name || !form.email) return alert("Nombre y email son obligatorios");

    try {
      await customersApi.create(form);
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al crear cliente");
    }
  };

  return (
    <ModalShell
      title = "Nuevo Cliente"
      onClose = {onClose}
      footer = {<><Button variant = "secondary" onClick = {onClose}>Cancelar</Button><Button onClick = {handleCreate}>Crear</Button></>}
    >
      <input name = "name" placeholder = "Nombre *" className = "app-input" onChange = {handleChange} />
      <input name = "email" placeholder = "Email *" className = "app-input" onChange = {handleChange} />
      <input name = "phone" placeholder = "Teléfono" className = "app-input" onChange = {handleChange} />
      <input name = "address" placeholder = "Dirección" className = "app-input" onChange = {handleChange} />
    </ModalShell>
  );
}
