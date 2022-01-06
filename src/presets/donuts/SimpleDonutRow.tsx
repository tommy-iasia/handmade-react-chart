import React, { useState } from "react";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import { SimpleDonut } from "./SimpleDonut";

const examples = [
  [1, 2, 3],
  [2, 3, 4, 5],
  [100, 800],
];

export function SimpleDonutRow() {
  const [index, setIndex] = useState(0);
  const example = examples[index];

  return (
    <Row
      chart={<SimpleDonut radius={100} values={example} />}
      code={
        <Tag
          name="SimpleDonut"
          content={
            <>
              <Property name="radius" value="100" />
              <Property name="values" value={JSON.stringify(example)} />
            </>
          }
        />
      }
      content="A simple donut for an array of numbers"
      onMouseLeave={() => setIndex((index) => (index + 1) % examples.length)}
    />
  );
}
