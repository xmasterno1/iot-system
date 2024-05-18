"use client";

import {type TableColumnsType} from "antd";
import {IDataSensor, IQueryParams} from "~/types";
import TableGlobal from "~/components/TableGlobal";
import SearchBar from "~/components/SearchBar";
import {useState} from "react";

const columns: TableColumnsType<IDataSensor> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: "10%",
    align: "center",
    render: (_text, _record, index) => <div className="">{index++}</div>,
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

const options = [
  {label: "Temperature", value: "temp"},
  {label: "Humidity", value: "hum"},
  {label: "Light", value: "light"},
  {label: "Created at", value: "createdAt"},
];

export function DataSensor(): JSX.Element {
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
        typeSearch="data-sensor"
        options={options}
        params={params}
        setParams={setParams}
      />
      <TableGlobal<IDataSensor>
        typeTable="data-sensor"
        columns={columns}
        params={params}
        setParams={setParams}
      />
    </div>
  );
}
