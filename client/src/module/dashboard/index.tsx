"use client";

import {Col, Row} from "antd";
import Chart from "./components/Chart";
import {sensors, sensorsLength} from "./SensorList";
import SensorCard from "./components/SensorCard";
import {devices} from "./DeviceList";
import DeviceCard from "./components/DeviceCard";

const fakeDataSensors = [
  {temp: 20, hum: 20, light: 2000, time: "20:20:20"},
  {temp: 25, hum: 24, light: 2430, time: "20:20:20"},
  {temp: 34, hum: 25, light: 2230, time: "20:20:20"},
  {temp: 55, hum: 20, light: 2870, time: "20:20:20"},
  {temp: 43, hum: 28, light: 2098, time: "20:20:20"},
  {temp: 25, hum: 40, light: 2910, time: "20:20:20"},
  {temp: 22, hum: 50, light: 1108, time: "20:20:20"},
  {temp: 36, hum: 23, light: 2002, time: "20:20:20"},
  {temp: 37, hum: 18, light: 3006, time: "20:20:20"},
  {temp: 28, hum: 80, light: 1129, time: "20:20:20"},
];

export function Dashboard(): JSX.Element {
  return (
    <div className="wrapper px-24">
      {/* Row 1 - Sensor */}
      <Row gutter={100}>
        {sensors.map((sensor, index) => (
          <Col key={index} span={24 / sensorsLength}>
            <SensorCard
              iconUrl={sensor.icon}
              title={sensor.title}
              data={sensor.data}
              bgColor={sensor.color}
            />
          </Col>
        ))}
      </Row>
      {/* Row 2*/}
      <Row gutter={100} className="mt-8">
        {/* Row2/Col1 - Chart */}
        <Col span={24 - 24 / sensorsLength}>
          <div className="h-[580px] bg-white rounded-xl p-4 shadow-inner">
            <Chart dataSensors={fakeDataSensors} />
          </div>
        </Col>
        {/* Rpw2/Col2 - Device */}
        <Col span={24 / sensorsLength}>
          <Row gutter={[24, 24]}>
            {devices.map((device, index) => (
              <Col key={index} span={24}>
                <DeviceCard
                  imgUrl={device.image}
                  hasSWitch={device.hasSWitch}
                  type={device.type}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
