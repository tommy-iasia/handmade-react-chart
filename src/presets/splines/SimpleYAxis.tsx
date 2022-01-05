import { useContext, useMemo } from "react";
import { Label, SplineYAxis } from "../../splines/axes/SplineYAxis";
import { SplineAreaItem } from "../../splines/SplineAreaItem";
import { SplineChartContext } from "../../splines/SplineChartContext";
import { SplineLineItem } from "../../splines/SplineLineItem";

export function SimpleYAxis() {
  const { lineItems, areaItems } = useContext(SplineChartContext);

  const labels = useMemo(
    () => getLabels(lineItems, areaItems),
    [areaItems, lineItems]
  );

  return <SplineYAxis labels={labels} />;
}

export function getLabels(
  lineItems: SplineLineItem[],
  areaItems: SplineAreaItem[]
) {
  const lineValues = lineItems.flatMap((t) => t.points).map((point) => point.y);

  const areaValues = areaItems
    .flatMap((t) => t.points)
    .flatMap((point) => [point.upperY, point.lowerY]);

  const itemValues = [...lineValues, ...areaValues];

  if (itemValues.length <= 0) {
    return [];
  }

  const maximum = Math.max(...itemValues);
  const minimum = Math.min(...itemValues);
  const magnitude = Math.max(Math.abs(maximum), Math.abs(minimum));

  const order = Math.pow(10, Math.floor(Math.log10(magnitude)));

  const count =
    (maximum > 0 ? Math.floor(maximum / order) : 0) +
    (minimum < 0 ? Math.floor(-minimum / order) : 0);

  const step = count <= 2 ? order / 2 : count < 5 ? order : order * 2;

  const labels: Label[] = [];

  if (maximum >= 0) {
    for (let value = step; value <= maximum; value += step) {
      labels.push({ value, text: value });
    }
  }

  if (minimum < 0) {
    for (let value = 0; value >= minimum; value -= step) {
      labels.push({ value, text: value });
    }
  }

  return labels;
}
