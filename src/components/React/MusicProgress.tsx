import moment from "moment";
import useProgress from "../../hooks/useProgress.ts";

interface MusicProgresProps {
  start: number | undefined;
  end: number | undefined;
}

export default function MusicProgress({ start, end }: MusicProgresProps) {
  if (!start || !end) return null;

  const { percentage: progressPercentage } = useProgress({
    start,
    end,
  });

  const curTime = Date.now();
  const elapsed = moment(curTime - start).format("mm[:]ss");
  const remaining = moment(end - curTime).format("mm[:]ss");

  return (
    <div>
      <div className="w-full h-[2px] bg-gray-400 dark:bg-slate-800 rounded-md overflow-hidden">
        <div
          className="bg-rose-600 h-full"
          style={{
            width: `${Math.min(100, progressPercentage)}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          {elapsed}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          {remaining}
        </div>
      </div>
    </div>
  );
}
