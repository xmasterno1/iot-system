import images from "~/asset/img";
import {EDevice} from "~/types";

const devices = [
  {
    type: EDevice.FAN,
    image: images.fan,
    hasSWitch: true,
  },
  {
    type: EDevice.LED,
    image: images.bulbOn,
    hasSWitch: true,
  },
  // {
  //   type: EDevice.BULB,
  //   image: images.bulbOff,
  //   hasSWitch: false,
  // },
];

const devicesLength = devices.length;

export {devices, devicesLength};
