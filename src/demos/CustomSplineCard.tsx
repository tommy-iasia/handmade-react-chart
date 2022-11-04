import { useState } from "react";
import { Area, Grid, Spline, SplineChart, XAxis, YAxis } from "../components";
import { Card } from "./Card";
export function CustomSplineCard() {
  const [index, setIndex] = useState(0);

  return (
    <div onPointerLeave={() => setIndex((index + 1) % 4)}>
      <Card>
        <SplineChart
          className="chart"
          chartWidth={250}
          chartHeight={200}
          contentLeft={40}
          contentTop={5}
          contentWidth={200}
          contentHeight={165}
        >
          {index < 3 ? <Grid ys={[5, 10, 15]} /> : <Grid xs={[50, 100, 150]} />}

          <XAxis
            y={0}
            labels={[
              { x: 0, text: "0" },
              { x: 50, text: "L" },
              { x: 100, text: "C" },
              { x: 150, text: "CL" },
              { x: 200, text: "CC" },
            ]}
          />

          <YAxis
            x={0}
            labels={[
              { y: 5, text: "V" },
              { y: 10, text: "X" },
              { y: 15, text: "VX" },
            ]}
          />

          {(index === 0 || index >= 2) && (
            <Area
              points={[
                { x: 0, y: 1 },
                { x: 66, y: 10 },
                { x: 100, y: 8 },
                { x: 200, y: 16 },
              ]}
              baseY={0}
            />
          )}

          {(index <= 1 || index >= 3) && (
            <Spline
              points={[
                { x: 0, y: 1 },
                { x: 66, y: 10 },
                { x: 100, y: 8 },
                { x: 200, y: 16 },
              ]}
            />
          )}
        </SplineChart>

        <div className="code">
          {"<"}
          <span className="name">SplineChart</span>
          <br />
          <span className="property">chartWidth</span>={"{"}
          <span className="value">250</span>
          {"}"}
          <span className="property">chartHeight</span>={"{"}
          <span className="value">200</span>
          {"}"}
          <br />
          <span className="property">contentLeft</span>={"{"}
          <span className="value">40</span>
          {"}"}
          <span className="property">contentTop</span>={"{"}
          <span className="value">5</span>
          {"}"}
          <br />
          <span className="property">contentWidth</span>={"{"}
          <span className="value">200</span>
          {"}"}
          <span className="property">contentHeight</span>={"{"}
          <span className="value">165</span>
          {"}"}
          {">"}
          <div className="indent">
            {"<"}
            <span className="name">Grid</span>
            {index < 3 ? (
              <>
                <span className="property">ys</span>={"{"}
                <span className="value">[5,10,15]</span>
                {"}"}
              </>
            ) : (
              <>
                <span className="property">xs</span>={"{"}
                <span className="value">[50,100,150]</span>
                {"}"}
              </>
            )}
            {" />"}
            <br />
            {"<"}
            <span className="name">XAxis</span>
            <span className="property">y</span>={"{"}
            <span className="value">0</span>
            {"}"}
            <span className="property">labels</span>={"{"}
            <span className="value">
              [<br />
              <span className="indent">
                {"{"}x:0, text:"0"{"}"},
              </span>
              <br />
              <span className="indent">
                {"{"}x:50, text:"L"{"}"},
              </span>
              <br />
              <span className="indent">
                {"{"}x:100, text:"C"{"}"},
              </span>
              <br />
              <span className="indent">
                {"{"}x:150, text:"CL"{"}"},
              </span>
              <br />
              <span className="indent">
                {"{"}x:200, text:"CC"{"}"}
              </span>{" "}
              ]
            </span>
            {"}"} {"/>"}
            <br />
            {"<"}
            <span className="name">YAxis</span>
            <span className="property">x</span>={"{"}
            <span className="value">0</span>
            {"}"}
            <span className="property">labels</span>={"{"}
            <span className="value">
              [<br />
              <span className="indent">
                {"{"}y:5, text:"V"{"}"},
              </span>
              <br />
              <span className="indent">
                {"{"}y:10, text:"X"{"}"}
              </span>
              ,<br />
              <span className="indent">
                {"{"}y:15, text:"XV"{"}"}
              </span>{" "}
              ]
            </span>
            {"}"} {"/>"}
            {(index === 0 || index >= 2) && (
              <>
                <br />
                {"<"}
                <span className="name">Area</span>
                <span className="property">baseY</span>={"{"}
                <span className="value">0</span>
                {"}"}
                <span className="property">points</span>={"{"}
                <span className="value">
                  [<br />
                  <span className="indent">
                    {"{"}x:0, y:1{"}"},
                  </span>
                  <br />
                  <span className="indent">
                    {"{"}x:66, y:10{"}"},
                  </span>
                  <br />
                  <span className="indent">
                    {"{"}x:100, y:8{"}"},
                  </span>
                  <br />
                  <span className="indent">
                    {"{"}x:200, y:16{"}"}
                  </span>{" "}
                  ]
                </span>
                {"}"} {"/>"}
              </>
            )}
            {(index <= 1 || index >= 3) && (
              <>
                <br />
                {"<"}
                <span className="name">Spline</span>
                <span className="property">points</span>={"{"}
                <span className="value">
                  [<br />
                  <span className="indent">
                    {"{"}x:0, y:1{"}"},
                  </span>
                  <br />
                  <span className="indent">
                    {"{"}x:66, y:10{"}"},
                  </span>
                  <br />
                  <span className="indent">
                    {"{"}x:100, y:8{"}"},
                  </span>
                  <br />
                  <span className="indent">
                    {"{"}x:200, y:16{"}"}
                  </span>{" "}
                  ]
                </span>
                {"}"} {"/>"}
              </>
            )}
          </div>
          {"<"}/<span className="name">Chart</span>
          {">"}
        </div>

        <div className="text">
          Have full control on everything.
          <a
            className="more"
            href="https://github.com/tommyinb/handmade-react-chart/blob/master/src/splines/README.md#custom-component"
          >
            Read more...
          </a>
        </div>
      </Card>
    </div>
  );
}
