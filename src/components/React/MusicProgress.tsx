import useProgress from "../../hooks/useProgress.ts";

interface MusicProgresProps {
    start: number | undefined,
    end: number | undefined,
}

export default function MusicProgress({
    start,
    end,
}: MusicProgresProps) {
    if(!start || !end) return null;

    const progressPercentage = useProgress({
        start,
        end,
    });

    return (
        <div className="w-full h-[2px] bg-gray-400 dark:bg-slate-800 rounded-md overflow-hidden">
            <div className="bg-rose-600 h-full" style={{
                width: `${Math.min(100, progressPercentage)}%`,
            }}></div>
        </div>
    )
}