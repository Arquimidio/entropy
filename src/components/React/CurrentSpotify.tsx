import usePresence from "../../hooks/usePresence";
import MusicProgress from "./MusicProgress.tsx";
import type { PresenceData } from "../../types/discordPresence";
import { useStore } from "@nanostores/react";
import { presence } from "../../store.ts";

export default function CurrentSpotify() {
    const { data: presenceData, isHeartStopped } = useStore(presence);

    if(!presenceData || !presenceData?.listening_to_spotify || !isHeartStopped) return null;

    const { spotify } = presenceData as PresenceData;

    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-medium text-slate-800 dark:text-slate-200">🎧 I'm listening to</div>
            <div className="flex items-center rounded-md overflow-hidden min-h-[64px]">
                <div className="w-[64px] rounded-md overflow-hidden h-[64px] shrink-0">
                    <img className="max-w-full w-full h-full aspect-square object-cover" src={presenceData?.spotify?.album_art_url} alt="Spotify Album"/>
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