import { PiDotsSixVertical } from "react-icons/pi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Thing } from "../App";

export default function Box({thing}: {thing: Thing}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: thing.id})
    const style = {
        transform: CSS.Transform.toString(transform),
        touchAction: 'none',
        transition
    }

    return (
        <div ref={setNodeRef} style={style}  
        className="flex items-center justify-between gap-x-4 bg-green-700 rounded-sm p-4 overflow-hidden"> 
            <h1 className="w-full truncate">{thing.name}</h1>
            <PiDotsSixVertical {...attributes} {...listeners} className='text-lg cursor-grab active:cursor-grabbing' />
        </div>
    )
}