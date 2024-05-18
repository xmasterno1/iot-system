"use client";

import {
  ApiFilled,
  GithubFilled,
  HomeFilled,
  SignalFilled,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import images from "~/asset/img";

export interface IRouteItem {
  to: string;
  icon: JSX.Element;
  title: string;
}

const listRoutes: IRouteItem[] = [
  {
    to: "/",
    icon: <HomeFilled />,
    title: "Dashboard",
  },
  {
    to: "/data-sensor",
    icon: <SignalFilled />,
    title: "Data Sensor",
  },
  {
    to: "/action-history",
    icon: <ApiFilled />,
    title: "Action History",
  },
  {
    to: "/profile",
    icon: <GithubFilled />,
    title: "Profile",
  },
];

function Navbar(): JSX.Element {
  const [isActive, setIsActive] = useState<string>("/");

  return (
    <div className="grid grid-cols-5 bg-transparent backdrop-contrast-125 backdrop-blur-3xl px-4 text-gray-800">
      <div className="flex justify-center" onClick={() => setIsActive("/")}>
        <Link href="/" className="flex">
          <Image
            alt="logo"
            src={images.logo}
            height={56}
            className="flex my-4 mx-5"
          />
          <span className="font-extrabold text-3xl leading-[5rem] text-orange-200">
            Internet of things
          </span>
        </Link>
      </div>

      <div className="col-span-3 col-start-3 mr-6">
        <div className="grid grid-cols-4 gap-6 h-full">
          {listRoutes.map((item) => (
            <div
              key={item.to}
              className={`flex items-center justify-evenly ${isActive === item.to ? "border-b-4 border-red-500 text-red-500" : "hover:text-red-400"}`}
              onClick={() => setIsActive(item.to)}
            >
              <Link
                href={item.to}
                className="flex items-center h-full min-w-[80%] p-4 text-2xl font-semibold"
              >
                <span className="mr-4">{item.icon}</span>
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
