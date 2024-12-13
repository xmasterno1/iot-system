"use client";

import {Col, Row} from "antd";
import Chart from "./components/Chart";
import {sensors, sensorsLength} from "./SensorList";
import SensorCard from "./components/SensorCard";
import {devices} from "./DeviceList";
import DeviceCard from "./components/DeviceCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {IDataSensor} from "~/types";
import WindChart from "./components/WindChart";

const fakeDataSensors = [
  {temp: 20, hum: 20, light: 2000, createdAt: "20:20:20", wind: 10},
  {temp: 25, hum: 24, light: 2430, createdAt: "20:20:20", wind: 10},
  {temp: 34, hum: 25, light: 2230, createdAt: "20:20:20", wind: 10},
  {temp: 55, hum: 20, light: 2870, createdAt: "20:20:20", wind: 10},
  {temp: 43, hum: 28, light: 2098, createdAt: "20:20:20", wind: 10},
  {temp: 25, hum: 40, light: 2910, createdAt: "20:20:20", wind: 10},
  {temp: 22, hum: 50, light: 1108, createdAt: "20:20:20", wind: 10},
  {temp: 36, hum: 23, light: 2002, createdAt: "20:20:20", wind: 10},
  {temp: 37, hum: 18, light: 3006, createdAt: "20:20:20", wind: 10},
  {temp: 28, hum: 80, light: 1129, createdAt: "20:20:20", wind: 10},
];

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export function Dashboard(): JSX.Element {
  const [data, setData] = useState(fakeDataSensors);
  const latest = data[9];

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:5000");
        const reversedData = res.data.map((item: IDataSensor) => ({
          ...item,
          createdAt: formatDate(item.createdAt),
        }));
        setData(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="wrapper px-24">
      {/* Row 1 - Sensor */}
      <Row gutter={100}>
        {sensors.map((sensor, index) => (
          <Col key={index} span={24 / sensorsLength}>
            <SensorCard
              iconUrl={sensor.icon}
              title={sensor.title}
              data={
                sensor.title === "Temperature"
                  ? latest.temp
                  : sensor.title === "Humidity"
                    ? latest.hum
                    : sensor.title === "Light"
                      ? latest.light
                      : sensor.title === "Wind"
                        ? latest.wind
                        : sensor.data
              }
              bgColor={sensor.color}
            />
          </Col>
        ))}
      </Row>
      {/* Row 2*/}
      <Row gutter={100} className="mt-8">
        {/* Row2/Col1 - Chart */}
        <Col span={24 - 24 / sensorsLength}>
          <div className="grid grid-cols-2 gap-10">
            <div className="h-[580px] bg-white rounded-xl p-4 shadow-inner flex items-center col-span-1">
              <Chart dataSensors={data} />
            </div>
            <div className="h-[580px] bg-white rounded-xl p-4 shadow-inner flex items-center col-span-1">
              <WindChart dataSensors={data} />
            </div>
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
