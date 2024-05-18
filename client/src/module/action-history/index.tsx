"use client";

import type {TableColumnsType} from "antd";
import {IActionHistory, IQueryParams} from "~/types";
import TableGlobal from "~/components/TableGlobal";
import SearchBar from "~/components/SearchBar";
import {useState} from "react";

const columns: TableColumnsType<IActionHistory> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: "10%",
    align: "center",
    render: (_text, _record, index) => <div className="">{index++}</div>,
  },
  {
    title: "DEVICE NAME",
    dataIndex: "deviceName",
    filters: [
      {
        text: "Bulb",
        value: "bulb",
      },
      {
        text: "Fan",
        value: "fan",
      },
    ],
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

const data: IActionHistory[] = [
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 1,
    deviceName: "Fan",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 2,
    deviceName: "Bulb",
    action: "On",
    createdAt: "2024",
  },
  {
    id: 3,
    deviceName: "Bulb",
    action: "Off",
    createdAt: "2024",
  },
  {
    id: 4,
    deviceName: "Fan",
    action: "Off",
    createdAt: "2024",
  },
];

const options = [
  {label: "Device", value: "device"},
  {label: "Action", value: "action"},
  {label: "Created At", value: "createdAt"},
];

export function ActionHistory(): JSX.Element {
  const [params, setParams] = useState<IQueryParams>({
    searchValue: "",
    field: "",
    sortBy: "createdAt",
    sortOrder: "ASC",
    page: 1,
    pageSize: 10,
  });

  return (
    <div className="px-28">
      <SearchBar
        typeSearch="action-history"
        options={options}
        params={params}
        setParams={setParams}
      />
      <TableGlobal<IActionHistory>
        typeTable="action-history"
        columns={columns}
        data={data}
        params={params}
        setParams={setParams}
      />
    </div>
  );
}
