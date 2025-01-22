import { Fragment, useState } from "react";
import { DonutChart, ValueSlice } from "../components";
import { Card } from "./Card";
import { useResponsive } from "./useResponsive";

const items = [
  [10, 20, 30],
  [100, 100, 30],
];

export function CustomDonutCard() {
  const [index, setIndex] = useState(0);
  const values = items[index];

  const responsive = useResponsive();

  return (
    <Card
      next={(next) => setIndex((index + next + items.length) % items.length)}
    >
      <DonutChart
        className="chart"
        chartWidth={200}
        chartHeight={200}
        innerRadius={index < 2 ? 50 : 0}
        outerRadius={index < 3 ? 100 : 80}
      >
        {values.map((value, i) => (
          <ValueSlice
            key={i}
            index={i}
            value={value}
            outerRadius={index === 3 && i === 2 ? 100 : undefined}
          />
        ))}
      </DonutChart>

      <div className="code">
        {"<"}
        <span className="name">DonutChart</span>
        <br />
        <span className="property">chartWidth</span>={"{"}
        <span className="value">200</span>
        {"}"}
        {responsive && <br />}
        <span className="property">chartHeight</span>={"{"}
        <span className="value">200</span>
        {"}"}
        <br />
        <span className="property">innerRadius</span>={"{"}
        <span className="value">{index < 2 ? 50 : 0}</span>
        {"}"}
        {responsive && <br />}
        <span className="property">outerRadius</span>={"{"}
        <span className="value">{index < 3 ? 100 : 80}</span>
        {"}"}
        {">"}
        {values.map((value, i) => (
          <Fragment key={i}>
            <div className="indent">
              {"<"}
              <span className="name">ValueSlice</span>
              {responsive && <br />}
              <span className="property">index</span>={"{"}
              <span className="value">{i}</span>
              {"}"}
              <span className="property">value</span>={"{"}
              <span className="value">{value}</span>
              {"}"}
              {index === 3 && i === 2 && (
                <>
                  <br />
                  <span className="property">outerRadius</span>={"{"}
                  <span className="value">{100}</span>
                  {"}"}
                </>
              )}
              {" />"}
            </div>
          </Fragment>
        ))}
        {"<"}/<span className="name">Chart</span>
        {">"}
      </div>

      <div className="text">
        Have full control without boundary.
        <a
          className="more"
          href="https://github.com/tommyinb/handmade-react-chart/blob/master/src/donuts/README.md#css"
        >
          Read more...
        </a>
      </div>
    </Card>
  );
}
