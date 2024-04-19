import usePresence from "../../hooks/usePresence";
import MusicProgress from "./MusicProgress/MusicProgress";
import type { PresenceData } from "../../types/discordPresence";

export default function CurrentSpotify() {
    const presenceData = usePresence("1214266576573042708");

    if(!presenceData || !presenceData?.listening_to_spotify) return null;

    const { spotify } = presenceData as PresenceData;
    
    return (
        <div className="flex flex-col">
            <div className="mb-4 text-lg font-medium text-slate-800 dark:text-slate-200">I'm listening to</div>
            <div className="flex items-center bg-slate-800 rounded-md overflow-hidden">
                <div className="w-24">
                    <img className="object-fill max-w-full" src={presenceData?.spotify?.album_art_url} alt="Spotify Album"/>
                </div>
                <div className="px-5 flex-grow flex flex-col gap-1">
                    <div className="text-slate-300 line-clamp-1">{presenceData?.spotify?.song}</div>
                    <div className="text-sm text-slate-400 contain-layout line-clamp-1">{presenceData?.spotify?.artist}</div>
                    <MusicProgress start={spotify?.timestamps?.start} end={spotify?.timestamps?.end} />
                </div>
            </div>
        </div>
    )
}