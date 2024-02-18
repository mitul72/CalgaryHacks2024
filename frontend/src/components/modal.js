"use client";

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
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
              <ModalHeader className="flex flex-col gap-1 text-black">
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
                </CheckboxGroup>

                <Button color="success" size="md">
                  Add new listing
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
