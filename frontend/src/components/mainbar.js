import { useState } from "react";

import { Card, CardBody, Image, Input, useDisclosure } from "@nextui-org/react";

import { ItemModal } from "./item_modal";
import { useCoordinates } from "@/context/useCoordinates";

export default function MainBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { res, street, school } = useCoordinates();
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentTimings, setCurrentTimings] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [itemList, setItemList] = useState([...res, ...street, ...school]);

  console.log(itemList);

  const [slicedItemsArray, setSlicedItemsArray] = useState(
    itemList.slice(0, 30)
  );

  return (
    <>
      <div className="z-40 top-[35em] h-[calc(100vh - 35em)] w-screen absolute backdrop-blur-3xl p-4">
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
            setSlicedItemsArray(updatedList.slice(0, 30));
          }}
          onClear={() => {
            setSearchValue("");
            const updatedList = itemList.map((item) => ({
              ...item,
              shown: true,
            }));
            setItemList(updatedList);
            setSlicedItemsArray(updatedList.slice(0, 30));
          }}
          className="mx-3 text-black w-100"
        />

        <div className="h-[calc(100vh-41em)]">
          <div className="overflow-y-scroll gap-2 grid m-3 max-h-[calc(100vh-42em)]">
            {slicedItemsArray.map((item, index) => {
              return item.shown ? (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() => {
                    setCurrentAddress(item.address);
                    setCurrentPrice(item.hourly_price);
                    setCurrentType(item.type);
                    setCurrentDescription(item.description);
                    setCurrentTimings(item.timings);
                    onOpen();
                  }}
                  classNames="m-10"
                >
                  <CardBody className="p-6 text-small justify-between text-black text-wrap max-w-[50em] flex-row text-left">
                    <Image
                      src={() => {
                        if (item.type === "residential") {
                          return "/images/private-garage.png";
                        } else if (item.type == "street") {
                          return "/images/parked-car.png";
                        } else if (item.type == "school") {
                          return "/images/school-car.png";
                        }
                      }}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className="rounded-none"
                    />
                    <div className="ml-6">
                      <b>{item.address}</b>
                      <p className="text-default-500">
                        {item.hourly_price}/hour
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
      <ItemModal
        address={currentAddress}
        price_per_hour={currentPrice}
        type={currentType}
        description={currentDescription}
        timings={currentTimings}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
