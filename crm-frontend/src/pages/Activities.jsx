import { useEffect, useState } from "react";
import API from "../api/client";
import CreateActivityModal from "../components/CreateActivityModal.jsx";
import EditActivityModal from "../components/EditActivityModal.jsx"

import {
    DndContext,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";

const columns = ["PENDING", "DONE"];

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);


    const fetchActivities = async () => {
        try {
            const res = await API.get("/activities/");
            setActivities(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Eliminar actividad?")) return;

            await API.delete(`/activities/${id}`);
            fetchActivities();
        
    };

    const handleEdit = (activity) => {
        setSelectedActivity(activity);
    };

    useEffect(() => {
        fetchActivities();
    }, [])

    return (
        <div>
            <h1 className = "text-2xl font-bold mb-6">Actividades</h1>

            <button
                onClick = {() => setShowModal(true)}
                className = "mb-4 bg-blue-500 px-4 py-2 rounded"
            >
                + Nueva Actividad
            </button>

            <div className = "grid grid-cols-2 gap-4">
                {columns.map((col) => (
                    <Column key={col} status={col}>
                        {activities
                            .filter(a => a.status === col)
                            .map(a => (
                                <ActivityCard key={a.id} activity={a} onDelete = {handleDelete} onEdit = {handleEdit} />
                            ))}
                    </Column>
                ))}
            </div>
            {showModal && (
                <CreateActivityModal
                    onClose = {() => setShowModal(false)}
                    onCreated = {fetchActivities}
                />
            )}

            {/* EDIT MODAL */}
            {selectedActivity && (
                <EditActivityModal
                    activity = {selectedActivity}
                    onClose = {() => setSelectedActivity(null)}
                    onUpdated = {fetchActivities}
                />
            )}
        </div>
    );
}

function ActivityCard({ activity, onDelete, onEdit }){
    return (
        <div className = "bg-slate-800 p-3 rounded">
            <div className = "flex justify-between">
                <span>{activity.title}</span>
                <span>{activity.type}</span>
            </div>

            <p className = "text-xs text-slate-400">
                {activity.description}
            </p>

            {/* VISUAL STATE */}

            <input 
                type = "checkbox"
                checked = {activity.status === "DONE"}
                checked={activity.status === "DONE"}
                onChange={(e) => {
                const newStatus = e.target.checked ? "DONE" : "PENDING";
                }}
            />
            <button
                    onClick = {() => onEdit(activity)}
                    className = "bg-yellow-500 px-3 py-1 rounded text-sm p-2 flex flex-row gap-2"
                >
                    Editar
            </button>

            <button 
                onClick = {() => onDelete(activity.id)}
                className = "bg-red-500 px-3 py-1 rounded text-sm p-2 flex flex-row gap-2"
                >
                    Eliminar
            </button>
        </div>
    );
}

function Column({ status, children }) {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div ref = {setNodeRef} className = "bg-slate-900 p-3 rounded-xl">
            <h2 className = "text-sm text-slate-400 mb-3">{status}</h2>
            <div className = "flex flex-col gap-2">{children}</div>
        </div> 
    );
}