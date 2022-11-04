import { Fragment, useState } from "react";
import { AdvancedSplineChart } from "../components";
import { Card } from "./Card";
import { useAnimatedSplineItems } from "./useAnimatedSplineItems";
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

export function AdvancedSplineCard() {
  const allItems = [data1, data2];

  const [index, setIndex] = useState(0);
  const indexItems = allItems[index];

  const animatedItems = useAnimatedSplineItems(indexItems);

  const [shortCode, setShortCode] = useState(true);

  return (
    <div onPointerLeave={() => setIndex((index + 1) % allItems.length)}>
      <Card>
        <AdvancedSplineChart
          className="chart"
          width={250}
          height={200}
          items={animatedItems}
          getLabel={(point) => `${point.x}, ${point.y}`}
        />

        <div className="code">
          {"<"}
          <span className="name">AdvancedSplineChart</span>
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
                  points: [{"{"}x:{item.points[0].x}, y:{item.points[0].y}
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
                    <>
                      <br />
                      <span className="indent">
                        {"{"}x:{point.x}, y:{point.y}
                        {"}"}
                        {i < item.points.length - 1 && ","}
                      </span>
                    </>
                  ))}
                  ]{"}"}
                  {i < indexItems.length - 1 && ","}
                </Fragment>
              ))}
              <br />]
            </span>
          )}
          {"}"}
          <br />
          <span className="property">getLabel</span>=
          <span className="value">
            {"{"}({"{"}x, y{"}"}) {"=>"} `${"{"}x{"}"}, ${"{"}y{"}"}`{"}"}
          </span>
          {" />"}
        </div>

        <div className="text">Interact with user easily</div>
      </Card>
    </div>
  );
}
