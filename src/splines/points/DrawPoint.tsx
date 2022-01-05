import "./DrawPoint.css";

export function DrawPoint({ x, y }: Props) {
  return (
    <div
      className="handmadeReactChart-splines-points-DrawPoint"
      style={{ left: x, top: y }}
    ></div>
  );
}

interface Props {
  x: number;
  y: number;
}
