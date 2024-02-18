import React, { useState } from "react";
import { HamburgerModal } from "../modal";

import { useDisclosure } from "@nextui-org/react";

export const HamburgerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleMenu = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className="absolute right-0">
      <button
        className="flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none z-50"
        onClick={toggleMenu}
      >
        <span
          className={`h-0.5 w-6 bg-black transform transition duration-500 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        <span
          className={`h-0.5 w-6 bg-black my-1.5 transition-opacity duration-500 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`h-0.5 w-6 bg-black transform transition duration-500 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </button>
      <HamburgerModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};
