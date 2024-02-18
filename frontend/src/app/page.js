"use client";

import MainBar from "@/components/mainbar";
import MapComp from "@/components/map";
import { HamburgerButton } from "@/components/shared/hamburger";

export default function App() {
  return (
    <main>
      <HamburgerButton />
      <MapComp />
      <MainBar />
    </main>
  );
}
