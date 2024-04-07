// COMMON

// export

// Sort order
export enum ESortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

// DATA
export enum EDataSearchField {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  LIGHT = 'light',
}

export enum EDataFilter {
  ALL = 'all',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  LIGHT = 'light',
}

export enum EDataSortColumn {
  ID = 'id',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  LIGHT = 'light',
  TIME = 'time',
}

// ACTION
export enum EActionSortColumn {
  ID = 'id',
  DEVICE_NAME = 'deviceName',
  ACTION = 'action',
  TIME = 'time',
}

export enum EActionType {
  ON = 'ON',
  OFF = 'OFF',
}

export enum EActionFilter {
  ALL = 'ALL',
  ON = 'ON',
  OFF = 'OFF',
}
