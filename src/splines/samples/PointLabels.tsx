import { useContext } from "react";
import { ChartContext } from "../cores/ChartContext";
import { PointsInput } from "../cores/pointsInput";
import { SourcePoint } from "../cores/sourcePoint";
import { PointLabel } from "./PointLabel";

export function PointLabels({ inputType, getLabel }: Props) {
  const { pointsInputs } = useContext(ChartContext);

  const points = pointsInputs
    .filter((input) => input.type === inputType)
    .flatMap((input) => input.points);

  return (
    <>
      {points.map((point, i) => (
        <PointLabel key={i} x={point.x} y={point.y} text={getLabel(point)} />
      ))}
    </>
  );
}

interface Props {
  inputType: PointsInput["type"];
  getLabel: (sourcePoint: SourcePoint) => string;
}
