import { useEffect, useState } from "react";
import API from "../api/client";
import CreateOpportunityModal from "../components/CreateOpportunityModal.jsx";
import EditOpportunityModal from "../components/EditOpportunityModal.jsx";

import {
    DndContext,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";

const stages = ["LEAD", "CONTACTED", "PROPOSAL", "WON", "LOST"];

export default function Opportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);

    const fetchData = async () => {
        try {
            const res = await API.get("/opportunities/");
            setOpportunities(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Eliminar oportunidad?")) return;

        await API.delete(`/opportunities/${id}`);
        fetchData();
    };

    const handleDragEnd = async (event) => {
        const allowedTransitions = {
            LEAD: ["CONTACTED"],
            CONTACTED: ["PROPOSAL"],
            PROPOSAL: ["WON", "LOST"],
            WON: [],
            LOST: [],
        };

        const { active, over } = event;
        
        if (!over) return;

        const opportunityId = active.id;
        const newStatus = over.id;

        const opportunity = opportunities.find(o => o.id === opportunityId);
        const currentStatus = opportunity.status

        if (!currentStatus) return ;

        if (allowedTransitions[currentStatus].includes(newStatus)) {
            try {
                await API.patch(`/opportunities/${opportunityId}/status`, {
                    status: newStatus,
                });

                fetchData();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEdit = (opportunity) => {
        setSelectedOpportunity(opportunity);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 className = "text-2xl font-bold mb-6">Pipeline</h1>

            <button
                onClick = {() => setShowModal(true)}
                className = "mb-4 bg-blue-500 px-4 py-2 rounded"
            >
                + Nueva oportunidad
            </button>

            <DndContext onDragEnd = {handleDragEnd}>
                <div className = "grid grid-cols-5 gap-4">
                    {stages.map((stage) => (
                        <Column key = {stage} stage = {stage}>
                            {opportunities
                                .filter((o) => o.status === stage)
                                .map((o) => (
                                    <OpportunityCard key = {o.id} opportunity = {o} onDelete = {handleDelete} onEdit = {handleEdit}>
                                        
                                    </OpportunityCard>
                            ))}
                        </Column>                        
                    ))}
                </div>
            </DndContext>

            {showModal && (
                <CreateOpportunityModal
                    onClose={() => setShowModal(false)}
                    onCreated={fetchData}
                />
            )}

            {/* Show edit modal*/}
            {selectedOpportunity && (
                <EditOpportunityModal
                    opportunity = {selectedOpportunity}
                    onClose={() => setSelectedOpportunity(null)}
                    onUpdated = {fetchData}
                />
            )}
        </div>
    );
}

function OpportunityCard({ opportunity, onDelete, onEdit }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: opportunity.id,
    });

    const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
    : undefined;

    return (
        <div 
            ref = {setNodeRef}
            style = {style}
            className = "bg-slate-800 p-3 rounded"
        >

            {/* DRAG HANDLE*/}
            <div 
                {...listeners}
                {...attributes}
                className = "cursor-grab mb-2 flex justify-between items-center"
            >

                <span>{opportunity.title}</span>
                <span className="text-xs text-slate-400">{opportunity.value}€</span>

            </div>
            <button
                    onClick = {() => onEdit(opportunity)}
                    className = "bg-yellow-500 px-3 py-1 rounded text-sm p-2 flex flex-row gap-2"
                >
                    Editar
            </button>

            <button 
                onClick = {() => onDelete(opportunity.id)}
                className = "bg-red-500 px-3 py-1 rounded text-sm p-2 flex flex-row gap-2"
                >
                    Eliminar
            </button>
        </div>
    );
}

function Column({ stage, children }) {
    const { setNodeRef } = useDroppable({
        id: stage,
    });

    return (
        <div ref = {setNodeRef} className = "bg-slate-900 p-3 rounded-xl">
            <h2 className = "text-sm text-slate-400 mb-3">{stage}</h2>
            <div className = "flex flex-col gap-2">{children}</div>
        </div>
    );
}