import { useState } from "react";
import { SimpleDonutChart } from "../components";
import { Card } from "./Card";

const items = [
  [1, 2, 3],
  [100, 800],
  [2, 3, 4, 5],
];

export function SimpleDonutCard() {
  const [index, setIndex] = useState(0);

  const values = items[index];

  return (
    <Card
      next={(next) => setIndex((index + next + items.length) % items.length)}
    >
      <SimpleDonutChart className="chart" radius={100} values={values} />

      <div className="code">
        {"<"}
        <span className="name">SimpleDonutChart</span>
        <span className="property">radius</span>={"{"}
        <span className="value">100</span>
        {"}"}
        <br />
        <span className="property">values</span>={"{"}
        <span className="value">[{values.join(",")}]</span>
        {"}"}
        {" />"}
      </div>

      <div className="text">
        Draw a chart so easily.
        <a
          className="more"
          href="https://github.com/tommyinb/handmade-react-chart/blob/master/src/donuts/README.md#simple-donut-chart"
        >
          Read more...
        </a>
      </div>
    </Card>
  );
}
