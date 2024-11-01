import moment from "moment"

export default function MyTime() {
  const offsetDate = moment().utcOffset(-3);
  
  return (
    <div>
      <div className="flex items-center gap-1 text-[12px] font-semibold">
        <span
          >{
            offsetDate.isAfter(moment().utcOffset(-3).set("hours", 17))
              ? "🌙"
              : "☀️"
          }</span>
        <span>
          <span className="text-white"
            >{offsetDate.format("HH")}</span>
          <span className="animate-pulse text-white">:</span>
          <span className="text-white"
            >{offsetDate.format("mm")}</span>
        </span>
      </div>
    </div>
  )
}