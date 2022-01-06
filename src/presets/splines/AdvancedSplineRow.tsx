import { Fragment, useState } from "react";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import { AdvancedSpline } from "./AdvancedSpline";

export function AdvancedSplineRow() {
  const [index, setIndex] = useState(0);
  const example = examples[index];

  return (
    <Row
      chart={
        <AdvancedSpline
          chartWidth={250}
          chartHeight={200}
          items={example}
          getLabel={(_, { x, y }) => `${x}, ${y}`}
        />
      }
      code={
        <Tag
          name="AdvancedSpline"
          content={
            <>
              <br />
              <Property name="chartWidth" value={250} />
              <Property name="chartHeight" value={200} />
              <br />
              <Property
                name="items"
                value={
                  <>
                    {"["}
                    {example.map((item, i) => (
                      <Fragment key={i}>
                        <br />
                        {`{ points: ${JSON.stringify(item.points)} }`}
                        {i < example.length - 1 ? "," : ""}
                      </Fragment>
                    ))}
                    {"]"}
                  </>
                }
              />
              <br />
              <Property
                name="getLabel"
                value={`(_, { x, y }) => \`\${x}, \${y}\``}
              />
            </>
          }
        />
      }
      content="Draw simple spline chart easily"
      onMouseLeave={() => setIndex((index) => (index + 1) % examples.length)}
    />
  );
}

const examples = [
  [
    {
      points: [
        { x: 0, y: 150 },
        { x: 100, y: 10 },
        { x: 200, y: 180 },
        { x: 300, y: 150 },
      ],
    },
    {
      points: [
        { x: 0, y: 100 },
        { x: 100, y: 200 },
        { x: 200, y: 10 },
        { x: 300, y: 80 },
      ],
    },
  ],
  [
    {
      points: [
        { x: 0, y: 100 },
        { x: 300, y: -50 },
        { x: 600, y: 150 },
        { x: 900, y: 100 },
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
  ],
];
