"use client";

import React from "react";
import {Col, Row, Watermark, List} from "antd";
import Image from "next/image";
import TypedText from "./TypedText";
import images from "~/asset/img";
import Link from "next/link";
import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  XOutlined,
} from "@ant-design/icons";

export function Profile(): JSX.Element {
  const data = [
    {
      icon: images.techKnowledge,
      title: "Technology knowledge",
      description: (
        <div className="text-base grid gap-x-8 gap-y-1 grid-cols-5">
          <Link
            className="text-slate-600"
            href="https://nextjs.org/"
            target="_blank"
          >
            NextJS
          </Link>
          <Link
            className="text-slate-600"
            href="https://flutter.dev/"
            target="_blank"
          >
            Flutter
          </Link>
          <Link
            className="text-slate-600"
            href="https://expressjs.com/"
            target="_blank"
          >
            ExpressJs
          </Link>
          <Link
            className="text-slate-600"
            href="https://nestjs.com/"
            target="_blank"
          >
            NestJS
          </Link>
          <Link
            className="text-slate-600"
            href="https://www.mongodb.com/"
            target="_blank"
          >
            MongoDB
          </Link>
          <Link
            className="text-slate-600"
            href="https://www.mysql.com/"
            target="_blank"
          >
            MySQL
          </Link>
          <Link
            className="text-slate-600"
            href="https://www.postman.com/"
            target="_blank"
          >
            Postman
          </Link>
          <Link
            className="text-slate-600"
            href="https://firebase.google.com/"
            target="_blank"
          >
            Firebase
          </Link>
          <Link
            className="text-slate-600"
            href="https://aws.amazon.com/"
            target="_blank"
          >
            AWS
          </Link>
          <Link
            className="text-slate-600"
            href="https://www.docker.com/"
            target="_blank"
          >
            Docker
          </Link>
          <Link
            className="text-slate-600"
            href="https://git-scm.com/"
            target="_blank"
          >
            Git
          </Link>
          <Link
            className="text-slate-600"
            href="https://cplusplus.com/"
            target="_blank"
          >
            C++
          </Link>
          <Link
            className="text-slate-600"
            href="https://www.typescriptlang.org/"
          >
            Typescript
          </Link>
          <span className="text-slate-600">...</span>
        </div>
      ),
    },
    {
      icon: images.certificate,
      title: "Certificate",
      description: (
        <div className="text-base grid grid-cols-4 gap-x-8">
          <span className="text-slate-600">TOEIC 770</span>
          <span className="text-slate-600">JLPT-N5</span>
        </div>
      ),
    },
    {
      icon: images.hobby,
      title: "My hobby",
      description: (
        <div className="text-base grid grid-cols-2 gap-y-1">
          <span className="text-slate-600">Playing billiards</span>
          <span className="text-slate-600">Reading books</span>
          <span className="text-slate-600">Leaning foreign languages</span>
          <span className="text-slate-600">Watching movies</span>
        </div>
      ),
    },
    {
      icon: images.socialMedia,
      title: "Interact with me",
      description: (
        <div className="text-base grid grid-cols-8 gap-x-6">
          <div>
            <Link
              href="https://www.facebook.com/xmasterno1"
              target="_blank"
              className="text-slate-600"
            >
              <FacebookFilled className="text-4xl" />
            </Link>
          </div>
          <div>
            <Link
              href="https://www.instagram.com/xmasterno1/"
              target="_blank"
              className="text-slate-600"
            >
              <InstagramFilled className="text-4xl" />
            </Link>
          </div>
          <div>
            <Link
              href="https://twitter.com/xmasterno1"
              target="_blank"
              className="text-slate-600"
            >
              <XOutlined className="text-4xl" />
            </Link>
          </div>
          <div>
            <Link
              href="https://www.linkedin.com/in/luanphung2705/"
              target="_blank"
              className="text-slate-600"
            >
              <LinkedinFilled className="text-4xl" />
            </Link>
          </div>
          <div>
            <Link
              href="https://github.com/luanphungduy"
              target="_blank"
              className="text-slate-600"
            >
              <GithubFilled className="text-4xl" />
            </Link>
          </div>
        </div>
      ),
    },
    {
      icon: images.contact,
      title: "Contact for work",
      description: (
        <div className="text-base grid grid-cols-2 gap-y-1">
          <span className="text-slate-600">Email: luanphungduy@gmail.com</span>
          <span className="text-slate-600">Phone: +84 363 030 729</span>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-24 mt-20">
      <Row gutter={100}>
        <Col span={12}>
          <Watermark content="xmasterno1">
            <div className="bg-white p-12 rounded-3xl italic h-[660px]">
              <h3 className="text-4xl font-bold mb-16 text-left">
                Hello, it&apos;s me
              </h3>
              <h1 className="text-6xl font-bold mb-16 text-center">
                Duy Luan{" "}
                <Image
                  src={images.developer}
                  alt="dev"
                  width={80}
                  height={80}
                  className="inline-block"
                />
              </h1>
              <h3 className="text-2xl mb-6">
                <span>And I&apos;m a </span>
                <span className="text-3xl text-cyan-400 font-semibold">
                  <TypedText />
                </span>
              </h3>
              <div className="text-lg text-justify">
                With a deep understanding of NextJS for web development, as well
                as Flutter for mobile, I specialize in delivering engaging user
                experiences across platforms. I thrive on creative
                problem-solving and collaboration, always striving for
                excellence in every project I undertake. Excited to connect and
                share experiences with fellow developers in the community!
              </div>
            </div>
          </Watermark>
        </Col>

        <Col span={12}>
          <Watermark content="IoT © 2024">
            <div className="bg-white p-12 rounded-3xl italic h-[660px]">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      className="mb-2"
                      avatar={
                        <Image
                          src={item.icon}
                          alt=""
                          width={68}
                          className="mr-6"
                        />
                      }
                      title={
                        <div className="tracking-widest text-xl font-bold mb-3">
                          {item.title}
                        </div>
                      }
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Watermark>
        </Col>
      </Row>
    </div>
  );
}
