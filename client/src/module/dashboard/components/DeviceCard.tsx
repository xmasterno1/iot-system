import Image from "next/image";
import {ConfigProvider, Switch} from "antd";
import {devicesLength} from "../DeviceList";
import {EDevice, IDeviceCard} from "~/types";
import {useState} from "react";
import images from "~/asset/img";
import axios from "axios";

const deviceItemHeight = (580 - 24 * (devicesLength - 1)) / devicesLength;

const DeviceCard = ({imgUrl, hasSWitch, type}: IDeviceCard): JSX.Element => {
  const [isOn, setIsOn] = useState<boolean>(false);
  console.log(isOn);
  const body = {
    topic: type === EDevice.FAN ? "fan" : "led",
    message: isOn ? "off" : "on",
  };
  const toggleDevice = async () => {
    try {
      const response = await axios.post("http://localhost:5000", body, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setIsOn(isOn ? false : true);
      } else {
        console.log("Lỗi ", response.status);
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu POST:", error);
    }
  };

  // if type = bulb => switch image from bulb off to bulb on
  // if type = fan => rotate Image fan
  const getDeviceImage = (): string => {
    if (type === EDevice.LED) {
      return isOn ? images.bulbOn : images.bulbOff;
    }
    return imgUrl;
  };

  return (
    <div
      className="bg-slate-100 rounded-xl p-2 shadow-inner flex items-center justify-evenly"
      style={{
        height: deviceItemHeight,
      }}
    >
      <Image
        src={getDeviceImage()}
        alt="device"
        width={108}
        height={108}
        className={type === EDevice.FAN && isOn ? "animate-spin" : ""}
      />
      {hasSWitch && (
        <ConfigProvider
          theme={{
            token: {
              colorTextLightSolid: "#455a64",
            },
            components: {
              Switch: {
                handleSize: 32,
                handleBg: isOn ? "#4caf50" : "#f44336",
                trackHeight: 48,
                trackMinWidth: 100,
                innerMaxMargin: 44,
                trackPadding: 8,
              },
            },
          }}
        >
          <Switch
            checkedChildren="O N"
            unCheckedChildren="O F F"
            onClick={toggleDevice}
            style={{
              backgroundColor: "#cfd8dc",
              fontWeight: 600,
            }}
          />
        </ConfigProvider>
      )}
    </div>
  );
};

export default DeviceCard;
export {deviceItemHeight};
