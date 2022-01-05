import { AdvancedDonutRow } from "./donuts/AdvancedDonutRow";
import { BasicDonutRow } from "./donuts/BasicDonutRow";
import { FreeDonutRow } from "./donuts/FreeDonutRow";
import { SimpleDonutRow } from "./donuts/SimpleDonutRow";
import "./List.css";
import { BasicSplineRow } from "./splines/BasicSplineRow";

export function List() {
  return (
    <div className="handmadeReactChart-presets-List">
      <BasicSplineRow />

      <SimpleDonutRow />
      <AdvancedDonutRow />
      <BasicDonutRow />
      <FreeDonutRow />
    </div>
  );
}
