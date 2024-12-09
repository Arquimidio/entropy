import { useEffect } from "react";
import usePresence from "../../hooks/usePresence";
import { presence } from "../../store";

export default function HeartStarter() {
  const [presenceData, isHeartStopped] = usePresence("1214266576573042708");

  useEffect(() => {
    presence.set({
      data: presenceData,
      isHeartStopped,
    });
  }, [presenceData, isHeartStopped]);

  return null;
}
