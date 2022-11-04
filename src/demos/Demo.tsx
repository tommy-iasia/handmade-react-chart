import { AdvancedDonutCard } from "./AdvancedDonutCard";
import { AdvancedSplineCard } from "./AdvancedSplineCard";
import { CustomDonutCard } from "./CustomDonutCard";
import { CustomSplineCard } from "./CustomSplineCard";
import "./Demo.css";
import { RawDonutCard } from "./RawDonutCard";
import { RawSplineCard } from "./RawSplineCard";
import { SimpleDonutCard } from "./SimpleDonutCard";
import { SimpleSplineCard } from "./SimpleSplineCard";

export function Demo() {
  return (
    <div className="handmadeReactChart-demos-Demo">
      <h1>handmade-react-chart</h1>

      <div className="columns">
        <div className="column">
          <RawSplineCard />
          <SimpleSplineCard />
          <AdvancedSplineCard />
          <CustomSplineCard />
        </div>

        <div className="column">
          <RawDonutCard />
          <SimpleDonutCard />
          <AdvancedDonutCard />
          <CustomDonutCard />
        </div>
      </div>
    </div>
  );
}
