import { useState } from "react";
import { RawSpline } from "../components";
import { Card } from "./Card";
const items = [
  [250, 20, 180, 150, 230, 200],
  [180, 250, 110, 230, 150, 210, 170, 200],
];

export function RawSplineCard() {
  const [index, setIndex] = useState(0);

  const values = items[index];

  return (
    <div onPointerLeave={() => setIndex((index + 1) % items.length)}>
      <Card>
        <RawSpline className="chart" width={200} height={200} values={values} />

        <div className="code">
          {"<"}
          <span className="name">RawSpline</span>
          <br />
          <span className="property">width</span>={"{"}
          <span className="value">200</span>
          {"}"}
          <span className="property">height</span>={"{"}
          <span className="value">200</span>
          {"}"}
          <br />
          <span className="property">values</span>={"{"}
          <span className="value">[{values.join(",")}]</span>
          {"}"}
          {" />"}
        </div>

        <div className="text">
          Draw a spline with one-liner.
          <a
            className="more"
            href="https://github.com/tommyinb/handmade-react-chart/blob/master/src/splines/README.md#spline-chart"
          >
            Read more...
          </a>
        </div>
      </Card>
    </div>
  );
}
