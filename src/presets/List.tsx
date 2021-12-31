import { AdvancedDonutRow } from "./donuts/AdvancedDonutRow";
import { BasicDonutRow } from "./donuts/BasicDonutRow";
import { FreeDonutRow } from "./donuts/FreeDonutRow";
import { SimpleDonutRow } from "./donuts/SimpleDonutRow";
import "./List.css";

export function List() {
  return (
    <div className="handmadeReactChart-presets-List">
      <SimpleDonutRow />
      <BasicDonutRow />
      <AdvancedDonutRow />
      <FreeDonutRow />
    </div>
  );
}
