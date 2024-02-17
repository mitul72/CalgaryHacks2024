"use client";

import MapComp from "@/components/map";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function App() {
  const list = [
    {
      address: "69 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "public",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
    },
  ];

  return (
    <main className="relative">
      <MapComp />
      <div className="absolute overflow-y-auto gap-2 grid m-5 overflow-scroll top-[40em] max-h-[15em]">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
            classNames="m-10"
          >
            <CardBody className="p-6 text-small justify-between text-black text-wrap max-w-[50em] flex-row">
              <Image
                src={
                  item.type == "public"
                    ? "/images/parked-car.png"
                    : "/images/private-garage.png"
                }
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-none"
              />
              <div className="ml-6">
                <b>{item.address}</b>
                <p className="text-default-500">{item.hourly_price}/hour</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
