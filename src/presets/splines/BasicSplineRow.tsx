import { useMemo, useState } from "react";
import { SplineXAxis } from "../../splines/axes/SplineXAxis";
import { SplineYAxis } from "../../splines/axes/SplineYAxis";
import { SplineArea } from "../../splines/SplineArea";
import { SplineChart } from "../../splines/SplineChart";
import { SplineLine } from "../../splines/SplineLine";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";

export function BasicSplineRow() {
  const [index, setIndex] = useState(0);
  const example = examples[index];

  const yLabels = useMemo(
    () => [
      { value: 50, text: "50" },
      { value: 100, text: "100" },
      { value: 150, text: "150" },
    ],
    []
  );

  const xLabels = useMemo(
    () => [
      { value: 0, text: "0" },
      { value: 50, text: "50" },
      { value: 100, text: "100" },
      { value: 150, text: "150" },
      { value: 200, text: "200" },
    ],
    []
  );

  const areaPoints = example.map((point) => ({
    x: point.x,
    upperY: point.y,
    lowerY: 0,
  }));

  return (
    <Row
      chart={
        <SplineChart
          chartWidth={255}
          chartHeight={200}
          contentLeft={40}
          contentTop={5}
          contentWidth={200}
          contentHeight={165}
          transitionDuration={500}
        >
          <SplineYAxis labels={yLabels} />
          <SplineXAxis labels={xLabels} />

          <SplineLine points={example} />
          <SplineArea points={areaPoints} />
        </SplineChart>
      }
      code={
        <Tag
          name="SplineChart"
          content={
            <>
              <br />
              <Property name="chartWidth" value={255} />
              <Property name="chartHeight" value={200} />
              <br />
              <Property name="contentLeft" value={40} />
              <Property name="contentTop" value={5} />
              <br />
              <Property name="contentWidth" value={200} />
              <Property name="contentHeight" value={165} />
            </>
          }
        >
          <Tag
            name="SplineYAxis"
            content={<Property name="label" value={JSON.stringify(yLabels)} />}
          />

          <Tag
            name="SplineXAxis"
            content={<Property name="label" value={JSON.stringify(xLabels)} />}
          />

          <Tag
            name="SplineLine"
            content={
              <Property
                name="points"
                value={
                  <>
                    <br />
                    {JSON.stringify(example)}
                  </>
                }
              />
            }
          />

          <Tag
            name="SplineArea"
            content={
              <Property
                name="points"
                value={
                  <>
                    <br />
                    {JSON.stringify(areaPoints)}
                  </>
                }
              />
            }
          />
        </Tag>
      }
      content="Having full control on everything"
      onMouseLeave={() => setIndex((index) => (index + 1) % examples.length)}
    />
  );
}

const examples = [
  [
    { x: 0, y: 100 },
    { x: 100, y: 10 },
    { x: 200, y: 180 },
  ],
  [
    { x: 0, y: 15 },
    { x: 66, y: 100 },
    { x: 132, y: 130 },
    { x: 200, y: 150 },
  ],
];
