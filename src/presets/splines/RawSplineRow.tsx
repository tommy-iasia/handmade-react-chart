import React, { useState } from "react";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import { RawSpline } from "./RawSpline";

export function RawSplineRow() {
  const [index, setIndex] = useState(0);
  const example = examples[index];

  return (
    <Row
      chart={<RawSpline width={200} height={200} values={example} />}
      code={
        <Tag
          name="RawSpline"
          content={
            <>
              <br />
              <Property name="width" value={200} />
              <Property name="height" value={200} />
              <br />
              <Property name="values" value={JSON.stringify(example)} />
            </>
          }
        />
      }
      content="Draw one spline with one-liner"
      onMouseLeave={() => setIndex((index) => (index + 1) % examples.length)}
    />
  );
}

const examples = [
  [100, 20, 180, 100],
  [250, 20, 180, 150, 230, 200],
  [180, 250, 110, 230, 150, 210, 170, 200],
];
