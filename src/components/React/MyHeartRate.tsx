import { useHeatRate } from "../../hooks/useHeartRate";

export default function MyHeartRate() {
  const [heartRate] = useHeatRate();

  if (!heartRate)
    return <div className="text-[12px] font-semibold">🩶 --</div>;

  return (
    <div className="text-[12px] font-semibold">
      <span className="animate-pulse">❤️</span>
      <span> {heartRate}</span>
    </div>
  );
}
