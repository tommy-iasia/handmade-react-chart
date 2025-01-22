import { useState } from "react";
import { RawDonut } from "../components";
import { Card } from "./Card";
import { useResponsive } from "./useResponsive";

const items = [
  [1, 2, 3],
  [100, 800],
  [2, 3, 4, 5],
];

export function RawDonutCard() {
  const [index, setIndex] = useState(0);
  const values = items[index];

  const responsive = useResponsive();

  return (
    <Card
      next={(next) => setIndex((index + next + items.length) % items.length)}
    >
      <RawDonut className="chart" radius={100} values={values} />

      <div className="code">
        {"<"}
        <span className="name">RawDonut</span>
        {responsive && <br />}
        <span className="property">radius</span>={"{"}
        <span className="value">100</span>
        {"}"}
        {responsive && <br />}
        <span className="property">values</span>={"{"}
        <span className="value">[{values.join(",")}]</span>
        {"}"}
        {" />"}
      </div>

      <div className="text">
        Draw a donut with one-liner.
        <a
          className="more"
          href="https://github.com/tommyinb/handmade-react-chart/blob/master/src/donuts/README.md#donut-chart"
        >
          Read more...
        </a>
      </div>
    </Card>
  );
}
