import { useState } from "react";
import { RawDonut } from "../components";
import { Card } from "./Card";
const items = [
  [1, 2, 3],
  [100, 800],
  [2, 3, 4, 5],
];

export function RawDonutCard() {
  const [index, setIndex] = useState(0);

  const values = items[index];

  return (
    <div onPointerLeave={() => setIndex((index + 1) % items.length)}>
      <Card>
        <RawDonut className="chart" radius={100} values={values} />

        <div className="code">
          {"<"}
          <span className="name">RawDonut</span>
          <span className="property">radius</span>={"{"}
          <span className="value">100</span>
          {"}"}
          <span className="property">values</span>={"{"}
          <span className="value">[{values.join(",")}]</span>
          {"}"}
          {" />"}
        </div>

        <div className="text">Draw a donut with one-liner</div>
      </Card>
    </div>
  );
}
