import { useEffect, useState } from "react";
import { customersApi } from "../api/resources";
import { Mail, MapPin, Phone, Plus, Users } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Panel from "../components/ui/Panel";
import CreateCustomerModal from "../components/CreateCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await customersApi.list();
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
      await customersApi.remove(id);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className = "mx-auto max-w-7xl space-y-8">
      <PageHeader
        title = "Customers"
        description = "Gestiona las cuentas comerciales y mantén sus datos listos para vender mejor."
        action = {
          <Button onClick = {() => setShowModal(true)}>
            <Plus size = {18} /> Nuevo Cliente
          </Button>
        }
      />

      <Panel className = "overflow-hidden">
        <div className = "flex items-center justify-between border-b border-slate-200/80 p-5 dark:border-white/10">
          <div className = "flex items-center gap-3">
            <div className = "rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-200">
              <Users size = {20} />
            </div>
            <div>
              <h2 className = "font-bold">Directorio de clientes</h2>
              <p className = "text-sm text-slate-500 dark:text-slate-400">{customers.length} registros</p>
            </div>
          </div>
          <Badge variant = "blue">CRM</Badge>
        </div>

        {loading ? (
          <p className = "p-6 text-sm text-slate-500 dark:text-slate-400">Cargando clientes...</p>
        ) : customers.length === 0 ? (
          <div className = "p-10 text-center">
            <Users className = "mx-auto mb-4 text-slate-300 dark:text-slate-600" size = {42} />
            <h3 className = "text-lg font-bold">No hay clientes todavía</h3>
            <p className = "mt-2 text-sm text-slate-500 dark:text-slate-400">Crea el primer cliente para empezar el flujo comercial.</p>
          </div>
        ) : (
          <div className = "overflow-x-auto">
            <table className = "w-full min-w-[760px] text-left text-sm">
              <thead className = "bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-400 dark:bg-white/5">
                <tr>
                  <th className = "px-5 py-4">Cliente</th>
                  <th className = "px-5 py-4">Contacto</th>
                  <th className = "px-5 py-4">Dirección</th>
                  <th className = "px-5 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className = "divide-y divide-slate-100 dark:divide-white/10">
                {customers.map((customer) => (
                  <tr key = {customer.id} className = "transition hover:bg-slate-50/80 dark:hover:bg-white/5">
                    <td className = "px-5 py-4">
                      <p className = "font-semibold text-slate-950 dark:text-white">{customer.name}</p>
                      <p className = "text-xs text-slate-500 dark:text-slate-400">ID {customer.id.slice(0, 8)}</p>
                    </td>
                    <td className = "px-5 py-4">
                      <div className = "space-y-1 text-slate-600 dark:text-slate-300">
                        <p className = "flex items-center gap-2"><Mail size = {14} /> {customer.email}</p>
                        <p className = "flex items-center gap-2"><Phone size = {14} /> {customer.phone || "Sin teléfono"}</p>
                      </div>
                    </td>
                    <td className = "px-5 py-4 text-slate-600 dark:text-slate-300">
                      <p className = "flex items-center gap-2"><MapPin size = {14} /> {customer.address || "Sin dirección"}</p>
                    </td>
                    <td className = "px-5 py-4">
                      <div className = "flex justify-end gap-2">
                        <Button variant = "secondary" onClick = {() => setSelectedCustomer(customer)}>Editar</Button>
                        <Button variant = "danger" onClick = {() => handleDelete(customer.id)}>Eliminar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {showModal && <CreateCustomerModal onClose = {() => setShowModal(false)} onCreated = {fetchCustomers} />}
      {selectedCustomer && <EditCustomerModal customer = {selectedCustomer} onClose = {() => setSelectedCustomer(null)} onUpdated = {fetchCustomers} />}
    </div>
  );
}
