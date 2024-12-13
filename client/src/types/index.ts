export enum EDevice {
  FAN = "fan",
  LED = "led",
}

export interface IDataSensor {
  id: number;
  temp: number;
  hum: number;
  light: number;
  wind: number;
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

export interface IQueryParams {
  searchValue?: string;
  field?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
  filter?: string;
}
