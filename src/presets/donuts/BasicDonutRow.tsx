import { useEffect, useState } from "react";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import { BasicDonut } from "./BasicDonut";

const examples = [
  { innerRadius: 65, outerRadius: 100, values: [1, 2, 3] },
  { innerRadius: 65, outerRadius: 100, values: [110, 130, 80] },
  { innerRadius: 0, outerRadius: 100, values: [110, 130, 80] },
];

export function BasicDonutRow() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    var timer = setInterval(
      () => setIndex((index) => (index + 1) % examples.length),
      3000
    );

    return () => clearInterval(timer);
  }, [active]);

  const { innerRadius, outerRadius, values } = examples[index];

  return (
    <Row
      chart={
        <BasicDonut
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          values={values}
        />
      }
      code={
        <Tag
          name="BasicDonut"
          content={
            <>
              <br />
              <Property name="innerRadius" value={innerRadius} />
              <br />
              <Property name="outerRadius" value={outerRadius} />
              <br />
              <Property name="values" value={JSON.stringify(values)} />
            </>
          }
        />
      }
      content="The most basic donut for you to expand it"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    />
  );
}
