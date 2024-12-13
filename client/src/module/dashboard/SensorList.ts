import images from "~/asset/img";

const sensors = [
  {
    title: "Temperature",
    icon: images.tempIcon,
    color: "bg-gradient-to-tr from-red-100 to-red-400",
    data: 24,
  },
  {
    title: "Humidity",
    icon: images.humIcon,
    color: "bg-gradient-to-tr from-blue-100 to-blue-400",
    data: 24,
  },
  {
    title: "Light",
    icon: images.lightIcon,
    color: "bg-gradient-to-tr from-yellow-100 to-yellow-400",
    data: 24,
  },
  {
    title: "Wind",
    icon: images.windIcon,
    color: "bg-gradient-to-tr from-green-100 to-green-400",
    data: 10,
  },
];
const sensorsLength = sensors.length;

export {sensors, sensorsLength};
