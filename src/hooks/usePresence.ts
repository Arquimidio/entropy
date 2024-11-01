import { useState, useEffect } from "react";
import { PresenceSocketOperation, type PresenceData } from "../types/discordPresence";

export default function usePresence(userDiscordId: string) {
    const [presenceData, setPresenceData] = useState<PresenceData | null>(null);
    const [heartBeatInterval, setHeartBeatInterval] = useState<any | null>(null);

    function pumpHeart(socket: WebSocket) {
        try {
            if(socket.readyState === socket.OPEN) {
                socket.send(JSON.stringify({
                    op: PresenceSocketOperation.Hearbeat
                }))

                console.log('THUMP THUMP');
            }
        } catch(e) {
            console.log('pumpHeart fail');
        }

    }

    function handleInitializationMessage(data: any, socket: WebSocket) {
        try {
            const initializationResponse = {
                op: PresenceSocketOperation.Initialize,
                d: {
                    subscribe_to_id: userDiscordId
                }
            }

            socket.send(JSON.stringify(initializationResponse));

            return setInterval(() => pumpHeart(socket), data?.d?.heartbeat_interval)
        } catch(e) {
            console.log('handleInitializationMessage critical fail');
        }

    }

    function handleSocketMessage(socket: WebSocket, message: any) {
        try {
            const data = JSON.parse(message.data);

            if(data.op === PresenceSocketOperation.Hello) {
                setHeartBeatInterval(handleInitializationMessage(data, socket));
            } else if(PresenceSocketOperation.Event === 0) {
                setPresenceData(data.d);
            }
        } catch(e) {
            console.log('handleSocketMessage fail')
        }

    }

    useEffect(() => {
        function initialize() { 
            const socket = new WebSocket('wss://api.lanyard.rest/socket');
            const handleSocketMessageWrapper = handleSocketMessage.bind(null, socket);

            function cleanup() {
                socket.removeEventListener('message', handleSocketMessageWrapper);
                socket.removeEventListener('close', handleClose);
                clearInterval(heartBeatInterval);
                socket?.close();
            }

            function handleClose() {
                cleanup();
                initialize();
            }

            socket.addEventListener('message', handleSocketMessageWrapper);
            socket.addEventListener('close', handleClose);

            return cleanup;
        }

        return initialize();
    }, [])

    return [presenceData, true] as [PresenceData, boolean];
}