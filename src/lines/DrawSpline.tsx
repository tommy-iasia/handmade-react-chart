import "./DrawSpline.css";

export function DrawSpline({ points }: Props) {
  const firstPoint = points[0];
  const firstText = `M ${firstPoint.x} ${firstPoint.y}`;

  const slopes = points.slice(1, -1).map((currentPoint, i) => {
    const lastPoint = points[i];
    const nextPoint = points[i + 2];

    const currentDirection = currentPoint.y - lastPoint.y;
    const nextDirection = nextPoint.y - currentPoint.y;

    if (
      (currentDirection > 0 && nextDirection > 0) ||
      (currentDirection < 0 && nextDirection < 0)
    ) {
      return { y: nextPoint.y - lastPoint.y, x: nextPoint.x - lastPoint.x };
    } else {
      return { y: 0, x: nextPoint.x - lastPoint.x };
    }
  });

  const controls = points.slice(1).map((currentPoint, i) => {
    const lastPoint = points[i];
    const lastSlope = slopes[i - 1] ?? { y: 0, x: 1 };

    const distanceX = currentPoint.x - lastPoint.x;
    const distanceY = currentPoint.y - lastPoint.y;

    const lastRatio = Math.max(
      Math.abs(lastSlope.y / distanceY),
      Math.abs(lastSlope.x / distanceX)
    );

    const control1X = lastPoint.x + lastSlope.x / lastRatio / 2;
    const control1Y = lastPoint.y + lastSlope.y / lastRatio / 2;

    const currentSlope = slopes[i] ?? { y: 0, x: 1 };

    const currentRatio = Math.max(
      Math.abs(currentSlope.x / distanceX),
      Math.abs(currentSlope.y / distanceY)
    );

    const control2X = currentPoint.x - currentSlope.x / currentRatio / 2;
    const control2Y = currentPoint.y - currentSlope.y / currentRatio / 2;

    return {
      x1: control1X,
      y1: control1Y,
      x2: control2X,
      y2: control2Y,
    };
  });

  const followingTexts = controls.map((control, i) => {
    const point = points[i + 1];

    return `C ${control.x1} ${control.y1}, ${control.x2} ${control.y2}, ${point.x} ${point.y}`;
  });

  return (
    <>
      <path
        className="handmadeReactChart-lines-DrawSpline"
        d={`${firstText} ${followingTexts.join(" ")}`}
      />

      {/* <path
        className="handmadeReactChart-lines-DrawSpline"
        d={`${firstText} ${points.slice(1).map((t) => `L ${t.x} ${t.y}`)}`}
      /> */}

      {controls.map((t, i) => {
        const lastPoint = points[i];

        const currentPoint = points[i + 1];

        return (
          <>
            <path
              className="handmadeReactChart-lines-DrawSpline"
              d={`M ${lastPoint.x} ${lastPoint.y} L ${t.x1} ${t.y1}`}
            />

            <path
              className="handmadeReactChart-lines-DrawSpline"
              d={`M ${currentPoint.x} ${currentPoint.y} L ${t.x2} ${t.y2}`}
            />
          </>
        );
      })}
    </>
  );
}

interface Props {
  points: { x: number; y: number }[];
}
