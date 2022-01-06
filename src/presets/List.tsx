import React from "react";
import { AdvancedDonutRow } from "./donuts/AdvancedDonutRow";
import { BasicDonutRow } from "./donuts/BasicDonutRow";
import { FreeDonutRow } from "./donuts/FreeDonutRow";
import { SimpleDonutRow } from "./donuts/SimpleDonutRow";
import "./List.css";
import { AdvancedSplineRow } from "./splines/AdvancedSplineRow";
import { BasicSplineRow } from "./splines/BasicSplineRow";
import { RawSplineRow } from "./splines/RawSplineRow";
import { SimpleSplineRow } from "./splines/SimpleSplineRow";

export function List() {
  return (
    <div className="handmadeReactChart-presets-List">
      <h1>Handmade React Chart</h1>

      <RawSplineRow />

      <SimpleSplineRow />
      <AdvancedSplineRow />
      <BasicSplineRow />

      <SimpleDonutRow />
      <AdvancedDonutRow />
      <BasicDonutRow />
      <FreeDonutRow />
    </div>
  );
}
