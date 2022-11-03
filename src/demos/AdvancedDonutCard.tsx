import { AdvancedDonutChart } from "../components";
import { Card } from "./Card";

export function AdvancedDonutCard() {
  return (
    <Card>
      <AdvancedDonutChart
        className="chart"
        chartWidth={300}
        chartHeight={250}
        innerRadius={60}
        outerRadius={90}
        selectedRadius={100}
        items={[
          { name: "Apple", value: 125 },
          { name: "Orange", value: 250 },
          { name: "Kiwi", value: 300 },
        ]}
        getKey={(item) => item.name}
        getValue={(item) => item.value}
        getName={(item) => item.name}
        getText={(item) => `${item.value}`}
      />

      <div className="code">
        {"<"}
        <span className="name">AdvancedDonutChart</span>
        <br />
        <span className="property">chartWidth</span>={"{"}
        <span className="value">300</span>
        {"}"}
        <br />
        <span className="property">chartHeight</span>={"{"}
        <span className="value">250</span>
        {"}"}
        <br />
        <span className="property">innerRadius</span>={"{"}
        <span className="value">65</span>
        {"}"}
        <br />
        <span className="property">outerRadius</span>={"{"}
        <span className="value">100</span>
        {"}"}
        <br />
        <span className="property">items</span>={"{"}
        <span className="value">
          [
          <br />
          <span className="indent">
            {"{"}name:"Apple", value:125{"}"}
          </span>
          <br />
          <span className="indent">
            {"{"}name:"Orange", value:250{"}"}
          </span>
          <br />
          <span className="indent">
            {"{"}name:"Kiwi", value:300{"}"}
          </span>{" "}
          ]
        </span>
        {"}"}
        <br />
        <span className="property">getKey</span>={"{"}
        <span className="value">(item) {"=>"} item.name</span>
        {"}"}
        <br />
        <span className="property">getValue</span>={"{"}
        <span className="value">(item) {"=>"} item.value</span>
        {"}"}
        <br />
        <span className="property">getName</span>={"{"}
        <span className="value">(item) {"=>"} item.name</span>
        {"}"}
        <br />
        <span className="property">getText</span>={"{"}
        <span className="value">
          (item) {"=>"} `${"{"}item.name{"}"}`
        </span>
        {"}"}
        {" />"}
      </div>

      <div className="text">Interaction is so smooth</div>
    </Card>
  );
}
