import { useEffect, useState } from "react";
import API from "../api/client";
import CreateCustomerModal from "../components/CreateCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); 

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers/");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar cliente?")) return;

    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers(); // refrescar
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Cargando clientes...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-slate-900 rounded-xl p-4 shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className = "p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.name}</td>

                <td className = "p-2 flex gap-2">
                  <button
                    onClick = {() => handleEdit(c)}
                    className = "bg-yellow-500 px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </button>

                  <button
                    onClick = {() => handleDelete(c.id)}
                    className = "bg-red-500 px-2 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <CreateCustomerModal
          onClose={() => setShowModal(false)}
          onCreated={fetchCustomers}
        />
      )}

      {selectedCustomer && (
        <EditCustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onUpdated={fetchCustomers}
        />
      )}
    </div>
  );
}