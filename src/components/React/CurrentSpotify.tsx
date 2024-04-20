import usePresence from "../../hooks/usePresence";
import MusicProgress from "./MusicProgress.tsx";
import type { PresenceData } from "../../types/discordPresence";

export default function CurrentSpotify() {
    const [presenceData, isHeartStopped] = usePresence("1214266576573042708");

    if(!presenceData || !presenceData?.listening_to_spotify || !isHeartStopped) return null;

    const { spotify } = presenceData as PresenceData;

    console.log(spotify);
    
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-medium text-slate-800 dark:text-slate-200">🎧 I'm listening to</div>
            <div className="flex items-center rounded-md overflow-hidden min-h-[75px]">
                <div className="w-[68px] rounded-md overflow-hidden">
                    <img className="max-w-full w-full" src={presenceData?.spotify?.album_art_url} alt="Spotify Album"/>
                </div>
                <div className="pl-5 flex-grow flex flex-col gap-1">
                    <div className="leading-3">
                        <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 line-clamp-1">{presenceData?.spotify?.song}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{presenceData?.spotify?.artist}</div>
                    </div>
                    <MusicProgress start={spotify?.timestamps?.start} end={spotify?.timestamps?.end}/>
                </div>
            </div>
        </div>
    )
}