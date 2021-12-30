import { useState } from "react";
import "./App.css";
import { MouseZone } from "./charts/mouses/MouseZone";
import { DonutChart } from "./donuts/DonutChart";
import { DonutItem } from "./donuts/DonutItem";
import { DonutSlice } from "./donuts/DonutSlice";
import { MouseLeaveDeselector } from "./donuts/mouses/MouseLeaveDeselector";
import { MouseMoveSelector } from "./donuts/mouses/MouseMoveSelector";

function App() {
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DonutItem>();

  return (
    <div className="App" onClick={() => setActive(!active)}>
      <MouseZone>
        <DonutChart
          width={500}
          height={500}
          innerRadius={100}
          outerRadius={230}
          transitionDuration={200}
        >
          <DonutSlice
            index={0}
            value={100}
            outerRadius={selectedItem?.index === 0 ? 250 : undefined}
          />

          <DonutSlice
            index={1}
            value={active ? 100 : 200}
            outerRadius={selectedItem?.index === 1 ? 250 : undefined}
          />

          <DonutSlice
            index={2}
            value={200}
            outerRadius={selectedItem?.index === 2 ? 250 : undefined}
          />

          <MouseMoveSelector setSelectedItem={setSelectedItem} />
          <MouseLeaveDeselector setSelectedItem={setSelectedItem} />
        </DonutChart>
      </MouseZone>
    </div>
  );
}

export default App;
