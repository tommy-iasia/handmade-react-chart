import { AdvancedDonutRow } from "./donuts/AdvancedDonutRow";
import { BasicDonutRow } from "./donuts/BasicDonutRow";
import { FreeDonutRow } from "./donuts/FreeDonutRow";
import { SimpleDonutRow } from "./donuts/SimpleDonutRow";
import "./List.css";
import { FreeSplineRow } from "./splines/FreeSplineRow";

export function List() {
  return (
    <div className="handmadeReactChart-presets-List">
      <FreeSplineRow />

      <SimpleDonutRow />
      <AdvancedDonutRow />
      <BasicDonutRow />
      <FreeDonutRow />
    </div>
  );
}
