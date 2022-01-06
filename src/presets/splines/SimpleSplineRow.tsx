import React, { useState } from "react";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import { SimpleSpline } from "./SimpleSpline";

export function SimpleSplineRow() {
  const [index, setIndex] = useState(0);
  const example = examples[index];

  return (
    <Row
      chart={
        <SimpleSpline chartWidth={250} chartHeight={200} items={example} />
      }
      code={
        <Tag
          name="SimpleSpline"
          content={
            <>
              <br />
              <Property name="chartWidth" value={250} />
              <br />
              <Property name="chartHeight" value={200} />
              <br />
              <Property name="items" value={JSON.stringify(example)} />
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
  ],
  [
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
  ],
];
