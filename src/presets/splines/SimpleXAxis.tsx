import { useContext, useMemo } from "react";
import { SplineXAxis } from "../../splines/axes/SplineXAxis";
import { Label } from "../../splines/axes/SplineYAxis";
import { SplineAreaItem } from "../../splines/SplineAreaItem";
import { SplineChartContext } from "../../splines/SplineChartContext";
import { SplineLineItem } from "../../splines/SplineLineItem";

export function SimpleXAxis() {
  const { lineItems, areaItems } = useContext(SplineChartContext);

  const labels = useMemo(
    () => getLabels(lineItems, areaItems),
    [areaItems, lineItems]
  );

  return <SplineXAxis labels={labels} />;
}

export function getLabels(
  lineItems: SplineLineItem[],
  areaItems: SplineAreaItem[]
) {
  const itemValues = [
    ...lineItems.flatMap((t) => t.points),
    ...areaItems.flatMap((t) => t.points),
  ].map((t) => t.x);

  if (itemValues.length <= 0) {
    return [];
  }

  const maximum = Math.max(...itemValues);
  const magnitude = Math.pow(10, Math.floor(Math.log10(maximum)));

  const count = Math.floor(maximum / magnitude);
  const step =
    count <= 2 ? magnitude / 2 : count < 5 ? magnitude : magnitude * 2;

  const labels: Label[] = [];

  for (let value = 0; value <= maximum; value += step) {
    labels.push({ value, text: value });
  }

  return labels;
}
