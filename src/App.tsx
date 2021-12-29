import { useState } from "react";
import "./App.css";
import { AnimatedSlice } from "./donuts/AnimatedSlice";
import { DonutChart } from "./donuts/DonutChart";
import { DonutSlice } from "./donuts/DonutSlice";
import Chart from "./utilities/Chart";

function App() {
  const [active, setActive] = useState(false);

  return (
    <div className="App" onClick={() => setActive(!active)}>
      <DonutChart width={500} height={500} outerRadius={200}>
        <DonutSlice index={0} value={100} outerRadius={250} />
        <DonutSlice index={1} value={100} />
      </DonutChart>

      <Chart width={500} height={500}>
        <AnimatedSlice
          centerX={250}
          centerY={250}
          innerRadius={100}
          outerRadius={250}
          fromAngle={90}
          toAngle={active ? 180 : 100}
          transitionDuration={500}
        />

        <AnimatedSlice
          centerX={250}
          centerY={250}
          innerRadius={100}
          outerRadius={active ? 250 : 150}
          fromAngle={180}
          toAngle={active ? 270 : 190}
          transitionDuration={500}
        />

        <AnimatedSlice
          centerX={250}
          centerY={250}
          innerRadius={100}
          outerRadius={active ? 250 : 150}
          fromAngle={270}
          toAngle={360}
          transitionDuration={500}
        />

        <AnimatedSlice
          centerX={250}
          centerY={250}
          innerRadius={100}
          outerRadius={active ? 250 : 150}
          fromAngle={360}
          toAngle={375}
          transitionDuration={500}
        />
      </Chart>
    </div>
  );
}

export default App;
