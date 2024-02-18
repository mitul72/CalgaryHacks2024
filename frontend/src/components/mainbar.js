import { useState } from "react";

import { Card, CardBody, Image, Input, useDisclosure } from "@nextui-org/react";

import { ItemModal } from "./item_modal";

export default function MainBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchValue, setSearchValue] = useState("");
  const [itemList, setItemList] = useState([
    {
      address: "69 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "public",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
    {
      address: "96 Cock Dick Fuckery, Calgary, AB; G4Y S3X",
      type: "private",
      hourly_price: "$5.50",
      shown: true,
    },
  ]);

  return (
    <>
      <div className="top-[35em] h-[23.25em] w-screen absolute backdrop-blur-2xl p-4">
        <Input
          isClearable
          type="location"
          color={"success"}
          variant={"faded"}
          placeholder="Enter a location"
          value={searchValue}
          defaultValue=""
          onChange={(event) => {
            setSearchValue(event.target.value);
            const updatedList = itemList.map((item) => ({
              ...item,
              shown: item.address
                .toLowerCase()
                .includes(event.target.value.toLowerCase()),
            }));
            setItemList(updatedList);
          }}
          onClear={() => setSearchValue("")}
          className="ml-3 max-w-[23.5em] text-black"
        />

        <div className="overflow-y-auto gap-2 grid m-3 overflow-scroll max-h-[16.2em]">
          {itemList.map((item, index) => {
            return item.shown ? (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => {
                  onOpen();
                }}
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
            ) : (
              <></>
            );
          })}
        </div>
      </div>
      <ItemModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
