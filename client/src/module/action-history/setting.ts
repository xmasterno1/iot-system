import {TableColumnsType} from "antd";
import {IActionHistory} from "~/types";

export const columns: TableColumnsType<IActionHistory> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: "10%",
    align: "center",
  },
  {
    title: "DEVICE NAME",
    dataIndex: "device",
    sorter: true,
    align: "center",
  },
  {
    title: "ACTION",
    dataIndex: "action",
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
  {label: "Device", value: "device"},
  {label: "Action", value: "action"},
  {label: "Created At", value: "createdAt"},
];
