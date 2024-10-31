import { useStore } from "@nanostores/react"
import { presence } from "../../store"
import clsx from "clsx";

export default function MyStatus() {
    const { data: presenceData } = useStore(presence);

    interface Statuses {
        idle: string,
        online: string,
        offline: string,
    }

    const statusClasses = {
        online: {
            bg: 'bg-green-500',
            text: 'text-green-500',
        },
        offline: {
            bg: 'bg-rose-500',
            text: 'text-rose-500',
        },
        idle: {
            bg: 'bg-orange-500',
            text: 'text-orange-500',
        },
    };

    const status: keyof Statuses = presenceData?.discord_status ?? 'offline';
    const currentStatus = statusClasses[status];

    if(!status) return null;

    return (
        <div className="flex items-center just gap-1">
            <div className={clsx(
                currentStatus.bg,
                "w-[6px] h-[6px] rounded-full animate-pulse",
            )}></div>
            <span className={clsx(
                "capitalize text-[12px] font-semibold",
                currentStatus.text
            )}>{status}</span>
        </div>
    )
}