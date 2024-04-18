import useProgress from "../../../hooks/useProgress";

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
        <div className="w-full h-[6px] bg-slate-900 rounded-md overflow-hidden">
            <div className="bg-slate-700 h-full" style={{
                width: `${progressPercentage}%`,
            }}></div>
        </div>
    )
}