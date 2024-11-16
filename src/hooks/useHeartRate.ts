import { useEffect, useState } from "react"

export const useHeatRate = () => {
  const [bpm, setBpm] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://137.184.96.61:4747/ws');

    const handleSocketMessage = (msg: any) => {
      const data = JSON.parse(msg.data);

      setBpm(data.hr);
    }

    const handleSocketOpen = () => console.log('Connection to the heart is open');

    socket.addEventListener('open', handleSocketOpen);
    socket.addEventListener('message', handleSocketMessage);
    

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
      socket.removeEventListener('open', handleSocketOpen);
      setBpm(null);
      socket.close();
    }
  }, [])

  return [bpm];
}