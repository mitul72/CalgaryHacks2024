"use client";

import MainBar from "@/components/mainbar";
import MapComp from "@/components/map";
import { MapProvider } from "@/context/useCoordinates";
import { HamburgerButton } from "@/components/shared/hamburger";

export default function App() {
  return (
    <main>
      <MapProvider>
        <HamburgerButton />
        <MapComp />
        <MainBar />
      </MapProvider>
    </main>
  );
}
