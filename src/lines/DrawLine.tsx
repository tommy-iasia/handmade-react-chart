import "./DrawLine.css";

export function DrawLine({ points }: Props) {
  const path = `M ${points
    .map((point) => `${point.x} ${point.y}`)
    .join(" L ")}`;

  return <path className="handmadeReactChart-lines-DrawLine" d={path} />;
}

interface Props {
  points: { x: number; y: number }[];
}
