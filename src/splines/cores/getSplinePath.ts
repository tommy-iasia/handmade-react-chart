import { Point } from "./point";

export function getSplinePath(points: Point[], smoothness: number) {
  const [firstPoint, ...otherPoints] = points;

  const firstText = `M ${firstPoint.x} ${firstPoint.y}`;

  const otherTexts = otherPoints.map((currentPoint, i) => {
    const previousPoint = points[i];

    const previousControlX =
      previousPoint.x + (currentPoint.x - previousPoint.x) * smoothness;

    const currentControlX =
      previousPoint.x + (currentPoint.x - previousPoint.x) * (1 - smoothness);

    return `C ${previousControlX} ${previousPoint.y}, ${currentControlX} ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
  });

  return `${firstText} ${otherTexts.join(" ")}`;
}
