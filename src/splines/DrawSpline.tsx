import "./DrawSpline.css";

export function DrawSpline({
  className,
  width,
  height,
  points,
  smoothness,
}: Props) {
  const firstPoint = points[0];
  const firstText = `M ${firstPoint.x} ${firstPoint.y}`;

  const smoothnessFactor = 0.4 * smoothness;

  const followingTexts = points.slice(1).map((currentPoint, i) => {
    const lastPoint = points[i];

    const distanceX = currentPoint.x - lastPoint.x;

    return `C ${lastPoint.x + distanceX * smoothnessFactor} ${lastPoint.y}, ${
      currentPoint.x - distanceX * smoothnessFactor
    } ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
  });

  return (
    <svg
      className={`handmadeReactChart-splines-DrawSpline ${className ?? ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={`${firstText} ${followingTexts.join(" ")}`} />
    </svg>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  points: { x: number; y: number }[];
  smoothness: number;
}
