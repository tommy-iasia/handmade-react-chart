import "./CenterText.css";

export function CenterText({ className, width, height, text }: Props) {
  return (
    <div
      className={`handmadeReactChart-donuts-samples-CenterText ${
        className ?? ""
      }`}
      style={{ width, height }}
    >
      {text}
    </div>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  text: string;
}
