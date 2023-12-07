import { PiDotsSixVertical } from "react-icons/pi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Thing } from "../App";

export default function Box({item, active}: {item: Thing, active: string}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: item.id})
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style}  
        className={`${item.id === active && 'invisible'} flex items-center justify-between gap-x-4 bg-green-700 rounded-sm p-4 overflow-hidden`}> 
            <h1 className="w-full truncate">{item.name}</h1>
            <PiDotsSixVertical {...attributes} {...listeners} className='text-lg cursor-grab active:cursor-grabbing touch-none' />
        </div>
    )
}