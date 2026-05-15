import { useEffect, useState } from "react";
import { opportunitiesApi } from "../api/resources";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { GripVertical, Plus } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Panel from "../components/ui/Panel";
import CreateOpportunityModal from "../components/CreateOpportunityModal.jsx";
import EditOpportunityModal from "../components/EditOpportunityModal.jsx";

const stages = ["LEAD", "CONTACTED", "PROPOSAL", "WON", "LOST"];
const stageVariant = {
    LEAD: "blue",
    CONTACTED: "violet",
    PROPOSAL: "amber",
    WON: "green",
    LOST: "rose",
};

export default function Opportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);

    const fetchData = async () => {
        try {
            const res = await opportunitiesApi.list();
            setOpportunities(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Eliminar oportunidad?")) return;

        await opportunitiesApi.remove(id);
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
        const currentStatus = opportunity?.status;

        if (currentStatus && allowedTransitions[currentStatus].includes(newStatus)) {
            try {
                await opportunitiesApi.updateStatus(opportunityId, newStatus);
                fetchData();
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        let active = true;

        opportunitiesApi.list()
            .then((res) => {
                if (active) setOpportunities(res.data);
            })
            .catch((err) => console.error(err));

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className = "mx-auto max-w-[1500px] space-y-8">
            <PageHeader
                title = "Pipeline"
                description = "Mueve oportunidades por etapa y mantén el forecast comercial bajo control."
                action = {
                    <Button onClick = {() => setShowModal(true)}>
                        <Plus size = {18} /> Nueva oportunidad
                    </Button>
                }
            />

            <DndContext onDragEnd = {handleDragEnd}>
                <div className = "grid gap-4 overflow-x-auto pb-3 lg:grid-cols-5">
                    {stages.map((stage) => {
                        const items = opportunities.filter((o) => o.status === stage);

                        return (
                            <Column key = {stage} stage = {stage} count = {items.length}>
                                {items.map((opportunity) => (
                                    <OpportunityCard
                                        key = {opportunity.id}
                                        opportunity = {opportunity}
                                        onDelete = {handleDelete}
                                        onEdit = {setSelectedOpportunity}
                                    />
                                ))}
                            </Column>
                        );
                    })}
                </div>
            </DndContext>

            {showModal && <CreateOpportunityModal onClose = {() => setShowModal(false)} onCreated = {fetchData} />}
            {selectedOpportunity && <EditOpportunityModal opportunity = {selectedOpportunity} onClose = {() => setSelectedOpportunity(null)} onUpdated = {fetchData} />}
        </div>
    );
}

function OpportunityCard({ opportunity, onDelete, onEdit }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: opportunity.id });
    const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

    return (
        <Panel className = "p-4" ref = {undefined}>
            <div ref = {setNodeRef} style = {style}>
                <div {...listeners} {...attributes} className = "mb-4 flex cursor-grab items-start justify-between gap-3">
                    <div>
                        <p className = "font-bold text-slate-950 dark:text-white">{opportunity.title}</p>
                        <p className = "mt-1 text-sm text-slate-500 dark:text-slate-400">{Number(opportunity.value || 0).toLocaleString("es-ES")}€</p>
                    </div>
                    <GripVertical className = "text-slate-400" size = {18} />
                </div>

                <div className = "mb-4">
                    <Badge variant = {stageVariant[opportunity.status]}>{opportunity.status}</Badge>
                </div>

                <div className = "flex gap-2">
                    <Button variant = "secondary" className = "flex-1 px-3 py-2" onClick = {() => onEdit(opportunity)}>Editar</Button>
                    <Button variant = "danger" className = "flex-1 px-3 py-2" onClick = {() => onDelete(opportunity.id)}>Eliminar</Button>
                </div>
            </div>
        </Panel>
    );
}

function Column({ stage, count, children }) {
    const { setNodeRef } = useDroppable({ id: stage });

    return (
        <div ref = {setNodeRef} className = "min-h-[420px] min-w-[280px] rounded-3xl border border-slate-200/80 bg-white/55 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/35">
            <div className = "mb-4 flex items-center justify-between">
                <Badge variant = {stageVariant[stage]}>{stage}</Badge>
                <span className = "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">{count}</span>
            </div>
            <div className = "flex flex-col gap-3">
                {count === 0 ? <p className = "rounded-2xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400 dark:border-white/10">Sin oportunidades</p> : children}
            </div>
        </div>
    );
}
