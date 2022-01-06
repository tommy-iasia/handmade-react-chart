import React from "react";
import { Property } from "../codes/Property";
import { Tag } from "../codes/Tag";
import { Row } from "../Row";
import { AdvancedDonut } from "./AdvancedDonut";

const example = [
  { name: "Apple", value: 125 },
  { name: "Orange", value: 250 },
  { name: "Kiwi", value: 300 },
];

export function AdvancedDonutRow() {
  return (
    <Row
      className="handmadeReactChart-presets-donuts-AdvancedDonutRow"
      chart={
        <AdvancedDonut
          width={300}
          height={250}
          innerRadius={65}
          outerRadius={100}
          items={example}
          getKey={(item) => item.name}
          getValue={(item) => item.value}
          getLabel={(item) => item.name}
          getCenter={(item) => item.value}
        />
      }
      code={
        <Tag
          name="AdvancedDonut"
          content={
            <>
              <br />
              <Property name="width" value="300" />
              <br />
              <Property name="height" value="250" />
              <br />
              <Property name="innerRadius" value="65" />
              <br />
              <Property name="outerRadius" value="100" />
              <br />
              <Property
                name="items"
                value={
                  <>
                    <br />
                    {JSON.stringify(example)}
                  </>
                }
              />
              <br />
              <Property name="getKey" value="(item) => item.name" />
              <br />
              <Property name="getValue" value="(item) => item.value" />
              <br />
              <Property name="getLabel" value="(item) => item.name" />
              <br />
              <Property name="getCenter" value="(item) => item.value" />
            </>
          }
        />
      }
      content="An advanced donut with animation and labels"
    />
  );
}
