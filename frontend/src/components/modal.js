"use client";

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Slider,
  Link,
} from "@nextui-org/react";

export const HamburgerModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <Modal
        size="full"
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
              <ModalHeader className="flex flex-col gap-1 text-black text-3xl">
                Menu
              </ModalHeader>
              <ModalBody className="text-black">
                <CheckboxGroup
                  label="Filters"
                  defaultValue={["on-street", "residential"]}
                >
                  <Checkbox value="on-street">On-Street Parking</Checkbox>
                  <Checkbox value="residential">Residential Parking</Checkbox>
                  <Checkbox value="school">School Parking</Checkbox>

                  <Slider
                    label="Price Range (Hourly)"
                    step={1}
                    maxValue={1000}
                    minValue={0}
                    defaultValue={0.4}
                    className="max-w-md mt-5"
                  />
                </CheckboxGroup>

                <CheckboxGroup label="Add a new listing" className="mt-5">
                  <Input
                    label="Address"
                    placeholder="Enter your address"
                    type="text"
                    variant="underlined"
                  />
                  <Input
                    label="Description"
                    placeholder="Enter your description"
                    type="text"
                    variant="underlined"
                  />
                  <Input
                    label="Availability"
                    placeholder="Enter your Availability"
                    type="text"
                    variant="underlined"
                  />

                  <Input
                    label="Price"
                    placeholder="Enter the Hourly Rental Price (in CAD)"
                    type="text"
                    variant="underlined"
                  />

                  <Button color="success" size="md" className="mt-5">
                    Add new listing
                  </Button>
                </CheckboxGroup>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
