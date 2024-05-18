import {Table} from "antd";
import type {TablePaginationConfig, TableProps} from "antd";
import {SortOrder, SorterResult} from "antd/es/table/interface";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {ICustomTable, IQueryParams} from "~/types";

const TableGlobal = <T extends Record<string, any>>({
  typeTable,
  columns,
  params,
  setParams,
  ...props
}: ICustomTable<T>): JSX.Element => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const renderPagination: TablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    showQuickJumper: true,
    showSizeChanger: true,
    // total: 100,
    style: {
      marginInlineEnd: 16,
    },
  };

  const mapSortOrder = (order: SortOrder | undefined): string | undefined => {
    switch (order) {
      case "ascend":
        return "ASC";
      case "descend":
        return "DESC";
      default:
        return "";
    }
  };

  const onChange: TableProps<T>["onChange"] = (pagination, filters, sorter) => {
    // Kiểm tra sorter là đối tượng hay mảng

    if (Array.isArray(sorter)) {
      // console.log("Sorter là mảng:", sorter);
    } else {
      // console.log("Sorter là đối tượng:", sorter);
      const {field = "createdAt", order = "ascend"} = sorter as SorterResult<T>;
      setParams((prev) => ({
        ...prev,
        page: pagination.current,
        pageSize: pagination.pageSize,
        sortBy: field as string,
        sortOrder: mapSortOrder(order),
        ...(typeTable === "action-history" && {filter: filters}),
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const {searchValue, field, page, pageSize, sortBy, sortOrder} = params;
      const url = `http://localhost:3001/${typeTable}?searchValue=${searchValue}&field=${field}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.page,
    params.pageSize,
    params.sortBy,
    params.sortOrder,
    params.filter,
  ]);

  return (
    <Table<T>
      size="large"
      columns={columns}
      dataSource={data}
      pagination={renderPagination}
      scroll={{y: 600}}
      onChange={onChange}
      className="bg-white rounded-xl mt-4"
      {...props}
    />
  );
};

export default TableGlobal;
