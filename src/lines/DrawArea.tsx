import "./DrawArea.css";

export function DrawArea({ points }: Props) {
  const upperPath = points
    .map((point) => `${point.x} ${point.upperY}`)
    .join(" L ");

  const reversedPoints = [...points];
  reversedPoints.reverse();

  const lowerPath = reversedPoints
    .map((point) => `${point.x} ${point.lowerY}`)
    .join(" L ");

  const path = `M ${upperPath} L ${lowerPath} Z`;

  return <path className="handmadeReactChart-lines-DrawArea" d={path} />;
}

interface Props {
  points: { x: number; upperY: number; lowerY: number }[];
}
