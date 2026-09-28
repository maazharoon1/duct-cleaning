"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import Before from "@/public/images/before.jpeg";
import After from "@/public/images/after.jpeg";

export function Comparison() {
  const [position, setPosition] = useState(50);
  return <div className="w-full pb-5 sm:pb-10">
    <div className="relative aspect-video w-full select-none overflow-hidden rounded-2xl shadow-xl focus-within:ring-4 focus-within:ring-blue-500">
      <Image src={Before} alt="Ductwork before cleaning" fill sizes="(max-width: 700px) 100vw, 65vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={After} alt="Ductwork after cleaning" fill sizes="(max-width: 700px) 100vw, 65vw" className="object-cover" draggable={false} />
      </div>
      <div className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">After</div>
      <div className="absolute right-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">Before</div>
      <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white shadow-lg" />
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white text-gray-800 shadow-xl"><ChevronsLeftRight size={23} /></div>
      </div>
      <input type="range" min="0" max="100" value={position} aria-label="Compare before and after duct cleaning" aria-valuetext={`${position}% after cleaning`} onChange={(event) => setPosition(Number(event.target.value))} className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  </div>;
}
