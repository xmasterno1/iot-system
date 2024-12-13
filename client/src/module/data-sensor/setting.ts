import {TableColumnsType} from "antd";
import {IDataSensor} from "~/types";

export const columns: TableColumnsType<IDataSensor> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: "10%",
    align: "center",
  },
  {
    title: "TEMPERATURE",
    dataIndex: "temp",
    sorter: true,
    align: "center",
  },
  {
    title: "HUMIDITY",
    dataIndex: "hum",
    sorter: true,
    align: "center",
  },
  {
    title: "LIGHT",
    dataIndex: "light",
    sorter: true,
    align: "center",
  },
  {
    title: "CREATED AT",
    dataIndex: "createdAt",
    width: "30%",
    sorter: true,
    align: "center",
  },
];

export const options = [
  {label: "Temperature", value: "temp"},
  {label: "Humidity", value: "hum"},
  {label: "Light", value: "light"},
  {label: "Created at", value: "createdAt"},
];
