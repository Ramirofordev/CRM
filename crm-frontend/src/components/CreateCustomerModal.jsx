import { useState } from "react";
import API from "../api/client";

export default function CreateCustomerModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    // validación mínima
    if (!form.name || !form.email) {
      return alert("Nombre y email son obligatorios");
    }

    try {
      await API.post("/customers/", form);
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al crear cliente");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-xl w-96 shadow-lg text-white">

        <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>

        <input
          name="name"
          placeholder="Nombre *"
          className="w-full mb-3 p-2 rounded bg-slate-800"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email *"
          className="w-full mb-3 p-2 rounded bg-slate-800"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Teléfono"
          className="w-full mb-3 p-2 rounded bg-slate-800"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Dirección"
          className="w-full mb-4 p-2 rounded bg-slate-800"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-slate-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreate}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}