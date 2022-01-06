import React from "react";
import "./DrawArea.css";

export function DrawArea({
  className,
  width,
  height,
  points,
  smoothness,
}: Props) {
  const firstPoint = points[0];
  const firstText = `M ${firstPoint.x} ${firstPoint.upperY}`;

  const smoothnessFactor = 0.4 * smoothness;

  const upperFollowingTexts = points.slice(1).map((currentPoint, i) => {
    const lastPoint = points[i];
    const distanceX = currentPoint.x - lastPoint.x;

    return `C ${lastPoint.x + distanceX * smoothnessFactor} ${
      lastPoint.upperY
    }, ${currentPoint.x - distanceX * smoothnessFactor} ${
      currentPoint.upperY
    }, ${currentPoint.x} ${currentPoint.upperY}`;
  });

  const upperText = `${firstText} ${upperFollowingTexts.join(" ")}`;

  const reversedPoints = [...points].reverse();

  const lastPoint = reversedPoints[0];
  const lastText = `L ${lastPoint.x} ${lastPoint.lowerY}`;

  const lowerFollowingTexts = reversedPoints.slice(1).map((currentPoint, i) => {
    const lastPoint = reversedPoints[i];
    const distanceX = currentPoint.x - lastPoint.x;

    return `C ${lastPoint.x + distanceX * smoothnessFactor} ${
      lastPoint.lowerY
    }, ${currentPoint.x - distanceX * smoothnessFactor} ${
      currentPoint.lowerY
    }, ${currentPoint.x} ${currentPoint.lowerY}`;
  });

  const lowerText = `${lastText} ${lowerFollowingTexts.join(" ")}`;

  return (
    <svg
      className={`handmadeReactChart-splines-DrawArea ${className ?? ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={`${upperText} ${lowerText} Z`} />
    </svg>
  );
}

interface Props {
  className?: string;
  width: number;
  height: number;
  points: { x: number; upperY: number; lowerY: number }[];
  smoothness: number;
}
