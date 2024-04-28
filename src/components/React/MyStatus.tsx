import { useStore } from "@nanostores/react"
import { presence } from "../../store"

export default function MyStatus() {
    const { data: presenceData } = useStore(presence);

    const status = presenceData?.discord_status;
    const STATUS_COLORS = {
        idle: ''
    }

    if(!status) return null;

    return (
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            <span className="text-rose-500 capitalize text-xs">{status}</span>
        </div>
    )
}