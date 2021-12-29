import "./DrawSlice.css";

export function DrawSlice({
  className,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  fromAngle,
  toAngle,
}: Props) {
  const fromRadian = (fromAngle * Math.PI) / 180;

  var outerFromX = centerX + outerRadius * Math.cos(fromRadian);
  var outerFromY = centerY + outerRadius * Math.sin(fromRadian);

  var innerFromX = centerX + innerRadius * Math.cos(fromRadian);
  var innerFromY = centerY + innerRadius * Math.sin(fromRadian);

  const toRadian = (toAngle * Math.PI) / 180;

  var outerToX = centerX + outerRadius * Math.cos(toRadian);
  var outerToY = centerY + outerRadius * Math.sin(toRadian);

  var innerToX = centerX + innerRadius * Math.cos(toRadian);
  var innerToY = centerY + innerRadius * Math.sin(toRadian);

  const largeArcFlag = toAngle - fromAngle >= 180 ? 1 : 0;

  return (
    <path
      className={`handmadeReactChart-donuts-DrawSlice ${className ?? ""}`}
      d={`M ${outerFromX} ${outerFromY}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerToX} ${outerToY}
            L ${innerToX} ${innerToY}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerFromX} ${innerFromY}
            Z`}
    />
  );
}

interface Props {
  className?: string;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  fromAngle: number;
  toAngle: number;
}
