"use client";

import {
  Button,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import {IDataSensor, IQueryParams} from "~/types";
import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {
  SortOrder,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import axios from "axios";
import {columns, options} from "./setting";

export function DataSensor(): JSX.Element {
  const [data, setData] = useState<IDataSensor[]>([]);
  const [total, setTotal] = useState<number>(10);

  const [params, setParams] = useState<IQueryParams>({
    searchValue: "",
    field: "",
    sortBy: "createdAt",
    sortOrder: "ASC",
    page: 1,
    pageSize: 10,
  });

  const renderPagination: TablePaginationConfig = {
    current: params.page,
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    showQuickJumper: true,
    showSizeChanger: true,
    total: total,
    style: {
      marginInlineEnd: 16,
    },
  };

  const convertOrder = (order: SortOrder | undefined): string | undefined => {
    switch (order) {
      case "ascend":
        return "ASC";
      case "descend":
        return "DESC";
      default:
        return "";
    }
  };

  const onChange: TableProps["onChange"] = (pagination, _filters, sorter) => {
    const {field = "createdAt", order = "ascend"} =
      sorter as SorterResult<IDataSensor>;
    setParams((prev) => ({
      ...prev,
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortBy: field as string,
      sortOrder: convertOrder(order),
    }));
  };

  const getData = async () => {
    try {
      let api = `http://localhost:5000/data-sensor?`;
      const {searchValue, field, page, pageSize, sortBy, sortOrder} = params;

      if (searchValue) api += `&searchValue=${searchValue}`;
      if (field) api += `&field=${field}`;
      if (page) api += `&page=${page}`;
      if (pageSize) api += `&pageSize=${pageSize}`;
      if (sortBy) api += `&sortBy=${sortBy}`;
      if (sortOrder) api += `&sortOrder=${sortOrder}`;

      const res = await axios.get(api, {withCredentials: true});

      setData(res.data.data);
      setTotal(res.data.totalRecords);
    } catch (error) {
      console.log("Lỗi khi thực hiện yêu cầu GET:", error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.page,
    params.pageSize,
    params.sortBy,
    params.sortOrder,
    params.filter,
  ]);

  return (
    <div className="px-28">
      {/* Search bar */}
      <Space.Compact size="large">
        <Input
          style={{
            minWidth: 400,
          }}
          allowClear
          placeholder="Type here to search ... "
          onChange={(e) =>
            setParams((pre) => ({
              ...pre,
              searchValue: e.target.value,
            }))
          }
        />
        <Select
          options={options}
          style={{minWidth: 152}}
          placeholder="Search field"
          allowClear={true}
          onChange={(value) => {
            setParams((pre) => ({
              ...pre,
              field: value as string | undefined,
            }));
          }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          loading={false}
          onClick={() => {
            setParams((pre) => ({
              ...pre,
              page: 1,
            }));
            getData();
          }}
        />
      </Space.Compact>

      {/* Table */}
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        pagination={renderPagination}
        scroll={{y: 600}}
        onChange={onChange}
        className="bg-white rounded-xl mt-4"
      />
      <Pagination />
    </div>
  );
}
