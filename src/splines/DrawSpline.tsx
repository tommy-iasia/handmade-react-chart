import "./DrawSpline.css";

export function DrawSpline({ points, smoothness }: Props) {
  const firstPoint = points[0];
  const firstText = `M ${firstPoint.x} ${firstPoint.y}`;

  const smoothnessFactor = 0.4 * (smoothness ?? 1);

  const followingTexts = points.slice(1).map((currentPoint, i) => {
    const lastPoint = points[i];

    const distanceX = currentPoint.x - lastPoint.x;

    return `C ${lastPoint.x + distanceX * smoothnessFactor} ${lastPoint.y}, ${
      currentPoint.x - distanceX * smoothnessFactor
    } ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
  });

  return (
    <path
      className="handmadeReactChart-splines-DrawSpline"
      d={`${firstText} ${followingTexts.join(" ")}`}
    />
  );
}

interface Props {
  points: { x: number; y: number }[];
  smoothness?: number;
}
