import { AdvancedDonutRow } from "./donuts/AdvancedDonutRow";
import { BasicDonutRow } from "./donuts/BasicDonutRow";
import { FreeDonutRow } from "./donuts/FreeDonutRow";
import { SimpleDonutRow } from "./donuts/SimpleDonutRow";
import { FreeSplineRow } from "./lines/FreeSplineRow";
import "./List.css";

export function List() {
  return (
    <div className="handmadeReactChart-presets-List">
      <FreeSplineRow />
      <SimpleDonutRow />
      <BasicDonutRow />
      <AdvancedDonutRow />
      <FreeDonutRow />
    </div>
  );
}
