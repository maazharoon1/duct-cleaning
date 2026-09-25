"use client";

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

function DuctScene({ dirty = false }: { dirty?: boolean }) {
  return <div className={"duct-scene" + (dirty ? " dirty" : " clean")} aria-hidden="true">
    <div className="duct-wall"><div className="duct-mouth"><div className="duct-depth"><span /><span /><span /><span /></div></div></div>
    {dirty && <div className="dust-cloud">{Array.from({length: 20}, (_, i) => <span key={i} style={{ left: ((i * 37) % 95) + "%", top: ((i * 29) % 80) + "%", width: (5 + (i % 4) * 6) + "px", height: (5 + (i % 4) * 6) + "px" }} />)}</div>}
  </div>;
}

export function Comparison() {
  const [position, setPosition] = useState(50);
  return <div className="comparison-widget">
    <div className="comparison-stage">
      <DuctScene />
      <div className="before-layer" style={{ clipPath: "inset(0 " + (100 - position) + "% 0 0)" }}><DuctScene dirty /></div>
      <span className="comparison-label label-before">Before</span><span className="comparison-label label-after">After</span>
      <div className="comparison-divider" style={{ left: position + "%" }}><span><ChevronsLeftRight size={23} /></span></div>
      <input className="comparison-range" type="range" min="0" max="100" value={position} aria-label="Reveal before and after duct illustration" onChange={(event) => setPosition(Number(event.target.value))} />
    </div>
    <div className="comparison-caption"><span>Built-up dust</span><span>Cleaned duct</span></div>
  </div>;
}
