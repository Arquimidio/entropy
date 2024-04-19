import { useState, useEffect } from "react";
import { PresenceSocketOperation, type PresenceData } from "../types/discordPresence";

export default function usePresence(userDiscordId: string) {
    const [presenceData, setPresenceData] = useState<PresenceData | null>(null);

    useEffect(() => {
        const ws = new WebSocket('wss://api.lanyard.rest/socket');
        let hearbeatInterval: any;

        const handleMessage = (response: any) => {
            
            const data = JSON.parse(response.data);

            if(data.op === PresenceSocketOperation.Hello) {
                const initializationResponse = {
                    op: PresenceSocketOperation.Initialize,
                    d: {
                        subscribe_to_id: userDiscordId
                    }
                }

                ws.send(JSON.stringify(initializationResponse));

                hearbeatInterval = setInterval(() => {
                    ws.send(JSON.stringify({
                        op: PresenceSocketOperation.Hearbeat
                    }))
                }, data?.d?.heartbeat_interval)
            } else if(PresenceSocketOperation.Event === 0) {
                setPresenceData(data.d);
            }
        }

        ws.addEventListener('message', handleMessage)

        return () => {
            ws.removeEventListener('message', handleMessage);
            clearInterval(hearbeatInterval);
            ws.close();
        }
    }, [])

    return presenceData;
}