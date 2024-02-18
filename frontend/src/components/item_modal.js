"use client";

import MainBar from "@/components/mainbar";
import MapComp from "@/components/map";
import { HamburgerButton } from "@/components/shared/hamburger";
import { useCoordinates } from "@/context/useCoordinates";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

export const ItemModal = ({
  isOpen,
  onOpen,
  onClose,
  address,
  price_per_hour,
  type,
  description,
  timings,
}) => {
  const { userLocation, getWaypoint } = useCoordinates();
  return (
    <>
      <Modal
        size="4xl"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-5 mt-5 text-black">
                <Image
                  src={
                    type == "public"
                      ? "/images/parked-car.png"
                      : "/images/private-garage.png"
                  }
                  width={50}
                  height={50}
                  alt="Picture of the author"
                  className="rounded-none"
                />
                {address}
                <span className="font-light">{timings}</span>
              </ModalHeader>
              <ModalBody className="mb-5 text-black">
                <p>{description}</p>

                <Button
                  onPress={() => {
                    // console.log(address);
                    getWaypoint(address);
                  }}
                  color="success"
                  size="lg"
                  className="mt-5 font-base"
                >
                  <span>
                    Book this for{" "}
                    <span className="font-bold">{price_per_hour}/hour</span>
                  </span>
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
