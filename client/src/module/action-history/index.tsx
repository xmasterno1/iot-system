"use client";

import {
  Button,
  Input,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import {IActionHistory, IQueryParams} from "~/types";
import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {SortOrder, SorterResult} from "antd/es/table/interface";
import axios from "axios";
import {columns, options} from "./setting";

export function ActionHistory(): JSX.Element {
  const [data, setData] = useState<IActionHistory[]>([]);
  const [total, setTotal] = useState<number>(10);

  const [params, setParams] = useState<IQueryParams>({
    searchValue: "",
    field: "",
    sortBy: "createdAt",
    sortOrder: "",
    page: 1,
    pageSize: 10,
    filter: "",
  });

  console.log(params);

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

  const onChange: TableProps["onChange"] = (pagination, filters, sorter) => {
    const {field = "createdAt", order = "ascend"} =
      sorter as SorterResult<IActionHistory>;
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
      let api = `http://localhost:5000/action-history?`;
      const {searchValue, field, page, pageSize, sortBy, sortOrder, filter} =
        params;
      if (searchValue) api += `&searchValue=${searchValue}`;
      if (field) api += `&field=${field}`;
      if (page) api += `&page=${page}`;
      if (pageSize) api += `&pageSize=${pageSize}`;
      if (sortBy) api += `&sortBy=${sortBy}`;
      if (sortOrder) api += `&sortOrder=${sortOrder}`;
      if (filter) api += `&filter=${filter}`;

      const res = await axios.get(api);

      setData(res.data.data);
      setTotal(res.data.totalRecords);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (valueFilter: string): void => {
    setParams((pre) => ({
      ...pre,
      filter: valueFilter,
    }));
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
      <div className="flex items-center gap-10">
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

        {/* Filter */}
        <Space.Compact size="large">
          <Select
            placeholder="Filter by device"
            allowClear
            style={{minWidth: 100}}
            options={[
              {label: "Led", value: "led"},
              {label: "Fan", value: "fan"},
            ]}
            onChange={handleFilter}
          />
        </Space.Compact>
      </div>

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
    </div>
  );
}
