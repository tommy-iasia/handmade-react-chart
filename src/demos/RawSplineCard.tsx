import { useState } from "react";
import { RawSpline } from "../components";
import { Card } from "./Card";
import { useResponsive } from "./useResponsive";

const items = [
  [250, 20, 180, 150, 230, 200],
  [180, 250, 110, 230, 150, 210, 170, 200],
];

export function RawSplineCard() {
  const [index, setIndex] = useState(0);
  const values = items[index];

  const responsive = useResponsive();
  const [shortCode, setShortCode] = useState(true);

  return (
    <Card
      next={(next) => {
        setIndex((index + next + items.length) % items.length);
        setShortCode(true);
      }}
    >
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
        <span className="value" onClick={() => setShortCode(false)}>
          [
          {responsive && shortCode ? (
            <>
              {values.slice(0, 3).join(",")}
              <span className="more">...</span>
            </>
          ) : (
            values.join(",")
          )}
          ]
        </span>
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
  );
}
