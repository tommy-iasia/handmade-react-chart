import { Chart } from "../../charts/Chart";
import { DrawSlice } from "../../donuts/DrawSlice";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import "./FreeDonutRow.css";

export function FreeDonutRow() {
  return (
    <Row
      className="handmadeReactChart-presets-donuts-FreeDonutRow"
      chart={
        <Chart width={200} height={200}>
          <DrawSlice
            className="free"
            width={200}
            height={200}
            centerX={100}
            centerY={100}
            innerRadius={0}
            outerRadius={100}
            fromAngle={45}
            toAngle={90}
          />

          <DrawSlice
            width={200}
            height={200}
            centerX={100}
            centerY={100}
            innerRadius={60}
            outerRadius={100}
            fromAngle={90}
            toAngle={360}
          />
        </Chart>
      }
      code={
        <Tag
          name="Chart"
          content={
            <>
              <Property name="width" value="200" />
              <Property name="height" value="200" />
            </>
          }
        >
          <Tag
            name="DrawSlice"
            content={
              <>
                <br />
                <Property name="className" value='"free"' />
                <br />
                <Property name="width" value="200" />
                <Property name="height" value="200" />
                <br />
                <Property name="centerX" value="100" />
                <Property name="centerY" value="100" />
                <br />
                <Property name="innerRadius" value="65" />
                <Property name="outerRadius" value="100" />
                <br />
                <Property name="fromAngle" value="45" />
                <Property name="toAngle" value="90" />
              </>
            }
          />

          <Tag
            name="DrawSlice"
            content={
              <>
                <br />
                <Property name="width" value="200" />
                <Property name="height" value="200" />
                <br />
                <Property name="centerX" value="100" />
                <Property name="centerY" value="100" />
                <br />
                <Property name="innerRadius" value="65" />
                <Property name="outerRadius" value="100" />
                <br />
                <Property name="fromAngle" value="90" />
                <Property name="toAngle" value="360" />
              </>
            }
          />
        </Tag>
      }
      content="Want full control? Draw freely without boundary"
    ></Row>
  );
}
