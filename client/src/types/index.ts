import {TableColumnsType, TableProps} from "antd";
import {FilterValue} from "antd/es/table/interface";
import React from "react";

export enum EDevice {
  FAN = "fan",
  BULB = "bulb",
}

export interface IDataSensor {
  id: number;
  temp: number;
  hum: number;
  light: number;
  createdAt: string;
}

export interface IActionHistory {
  id: number;
  deviceName: string;
  action: string;
  createdAt: string;
}

export interface ISensorCard {
  iconUrl: string;
  title: string;
  data: number;
  bgColor: string;
}

export interface IDeviceCard {
  imgUrl: string;
  hasSWitch: boolean;
  type: EDevice;
}

export interface SearchBarProps {
  typeSearch: string;
  options: {label: string; value: string}[];
  params: IQueryParams;
  setParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
}

export interface IQueryParams {
  searchValue?: string;
  field?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
  filter?: Record<string, FilterValue | null>;
}

export interface ICustomTable<T extends Record<string, any>>
  extends TableProps<T> {
  typeTable: string;
  columns: TableColumnsType<T>;
  params: IQueryParams;
  setParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
}
