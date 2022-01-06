import React, { useState } from "react";
import { DonutChart } from "../../donuts/DonutChart";
import { DonutSlice } from "../../donuts/DonutSlice";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";

const examples = [
  { innerRadius: 65, outerRadius: 100, values: [1, 2, 3] },
  { innerRadius: 50, outerRadius: 100, values: [110, 130, 80] },
  { innerRadius: 0, outerRadius: 100, values: [110, 130, 80] },
];

export function BasicDonutRow() {
  const [index, setIndex] = useState(0);
  const { innerRadius, outerRadius, values } = examples[index];

  return (
    <Row
      chart={
        <DonutChart
          width={outerRadius * 2}
          height={outerRadius * 2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
          {values.map((value, i) => (
            <DonutSlice key={i} index={i} value={value} />
          ))}
        </DonutChart>
      }
      code={
        <Tag
          name="DonutChart"
          content={
            <>
              <br />
              <Property name="width" value={outerRadius * 2} />
              <Property name="height" value={outerRadius * 2} />
              <br />
              <Property name="innerRadius" value={innerRadius} />
              <Property name="outerRadius" value={outerRadius} />
            </>
          }
        >
          {values.map((value, i) => (
            <Tag
              key={i}
              name="DonutSlice"
              content={
                <>
                  <Property name="key" value={i} />
                  <Property name="index" value={i} />
                  <Property name="value" value={value} />
                </>
              }
            />
          ))}
        </Tag>
      }
      content="The most basic donut for you to expand it"
      onMouseLeave={() => setIndex((index) => (index + 1) % examples.length)}
    />
  );
}
