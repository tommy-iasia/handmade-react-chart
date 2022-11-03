import "./CenterText.css";

export function CenterText({ width, height, text }: Props) {
  return (
    <div
      className="handmadeReactChart-donuts-samples-CenterText"
      style={{ width, height }}
    >
      {text}
    </div>
  );
}

interface Props {
  width: number;
  height: number;
  text: string;
}
