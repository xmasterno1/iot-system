import Image from "next/image";
import {sensorsLength} from "~/module/dashboard/SensorList";
import {ISensorCard} from "~/types";

const SensorCard = ({
  iconUrl,
  title,
  data,
  bgColor,
}: ISensorCard): JSX.Element => {
  return (
    <div
      className={`h-40 rounded-xl p-2 shadow-inner text-slate-600 text-center font-logo font-bold relative ${title === "Wind speed" && data < 15 ? "animate-pulse" : bgColor}`}
    >
      <Image
        src={iconUrl}
        alt="sensor"
        width={72}
        height={72}
        className={`absolute top-1/2 translate-y-[-50%] ${sensorsLength > 3 ? "left-8" : "left-14"}`}
      />
      <div className="text-xl mt-4 mb-8">{title}</div>
      <div className="text-3xl">{data}</div>
    </div>
  );
};

export default SensorCard;
