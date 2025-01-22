import { Fragment, useState } from "react";
import { SimpleSplineChart } from "../components";
import { Card } from "./Card";
import { useAnimatedSplineItems } from "./useAnimatedSplineItems";
import { useResponsive } from "./useResponsive";

export const data1 = [
  {
    points: [
      { x: 0, y: 100 },
      { x: 100, y: 10 },
      { x: 200, y: 180 },
      { x: 300, y: 150 },
    ],
  },
  {
    points: [
      { x: 0, y: 150 },
      { x: 100, y: 50 },
      { x: 200, y: 100 },
      { x: 300, y: 10 },
    ],
  },
];

export const data2 = [
  {
    points: [
      { x: 0, y: 100 },
      { x: 300, y: -50 },
      { x: 600, y: 180 },
      { x: 900, y: 150 },
    ],
  },
  {
    points: [
      { x: 0, y: -50 },
      { x: 300, y: 500 },
      { x: 600, y: -300 },
      { x: 900, y: 0 },
    ],
  },
];

export function SimpleSplineCard() {
  const allData = [data1, data2];

  const [index, setIndex] = useState(0);
  const indexItems = allData[index];

  const animatedItems = useAnimatedSplineItems(indexItems);

  const [shortCode, setShortCode] = useState(true);
  const responsive = useResponsive();

  return (
    <Card
      next={(next) => {
        setIndex((index + next + allData.length) % allData.length);
        setShortCode(true);
      }}
    >
      <SimpleSplineChart
        className="chart"
        width={250}
        height={200}
        items={animatedItems}
      />

      <div className="code">
        {"<"}
        <span className="name">SimpleSplineChart</span>
        <br />
        <span className="property">width</span>={"{"}
        <span className="value">250</span>
        {"}"}
        <span className="property">height</span>={"{"}
        <span className="value">200</span>
        {"}"}
        <br />
        <span className="property">items</span>={"{"}
        {shortCode ? (
          <span className="value" onClick={() => setShortCode(false)}>
            [
            {indexItems.map((item, i) => (
              <Fragment key={i}>
                <br />
                {"{"}
                points:{!responsive && " "}[{"{"}x:
                {item.points[0].x}, y:
                {item.points[0].y}
                {"}"}
                <span className="more">...</span>]{"}"}
                {i < indexItems.length - 1 && ","}
              </Fragment>
            ))}
            ]
          </span>
        ) : (
          <span className="value" onDoubleClick={() => setShortCode(true)}>
            [
            {indexItems.map((item, i) => (
              <Fragment key={i}>
                <br />
                {"{"}
                points: [
                {item.points.map((point, i) => (
                  <Fragment key={i}>
                    <br />
                    <span className="indent">
                      {"{"}x:{point.x}, y:{point.y}
                      {"}"}
                      {i < item.points.length - 1 && ","}
                    </span>
                  </Fragment>
                ))}
                ]{"}"}
                {i < indexItems.length - 1 && ","}
              </Fragment>
            ))}
            <br />]
          </span>
        )}
        {"}"}
        {" />"}
      </div>

      <div className="text">
        Draw spline chart easily.
        <a
          className="more"
          href="https://github.com/tommyinb/handmade-react-chart/blob/master/src/splines/README.md#simple-spline-chart"
        >
          Read more...
        </a>
      </div>
    </Card>
  );
}
