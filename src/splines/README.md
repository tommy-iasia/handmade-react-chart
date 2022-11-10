# Spline Chart

Spline is simply a SVG `<path/>`. Our job is to map the data points to drawing points of this path.

## SVG Path

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths), we use can use `M` and `L` to draw lines.

```SVG
<path d="M x0 y0 L x1 x2 L x3 x4 ..."/>
```

However, this method produces line with shape corners. In order to get a smooth spline, we will interpolate the points.

```svg
<path d="M x0 y0 C x0+ y0+, x1- y1-, x1 y1 C x1+ y1+, x2- y2-, x2 y2 ..."/>
```

The + and - points are imaginary points for corners.

Our [getSplinePath.ts](cores/getSplinePath.ts), further simplifying things by interpolating x only, is therefore written as following.

```ts
const [firstPoint, ...otherPoints] = points;

const firstText = `M ${firstPoint.x} ${firstPoint.y}`;

const otherTexts = otherPoints.map((currentPoint, i) => {
  const previousPoint = points[i];

  const previousControlX =
    previousPoint.x + (currentPoint.x - previousPoint.x) * smoothness;

  const currentControlX =
    previousPoint.x + (currentPoint.x - previousPoint.x) * (1 - smoothness);

  return `C ${previousControlX} ${previousPoint.y}, ${currentControlX} ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
});

return `${firstText} ${otherTexts.join(" ")}`;
```

## Coordinate

You know how to draw a line. Now, draw it in the correct position.

In [useDraw.ts](cores/useDraw.ts), we simply map a point according to the range of all points in chart.

```ts
const range = useRange();
const { maximum, minimum } = range;

const drawX = (x: number) =>
  ((x - minimum.x) / (maximum.x - minimum.x)) * contentWidth + contentLeft;

const drawY = (y: number) =>
  (1 - (y - minimum.y) / (maximum.y - minimum.y)) * contentHeight + contentTop;
```

## Raw Spline

Learning the above [two things](#svg-path), you can now draw [SVG](#svg-path) like in [Spline.tsx](cores/Spline.tsx) and [RawSpline.tsx](samples/RawSpline.tsx).

```tsx
export function Spline({ points: propsPoints, smoothness }: Props) {
  const draw = useDraw();

  const path = useMemo(
    () => getSplinePath(drawPoints, smoothness ?? 0.3),
    [draw, pointsInput, smoothness]
  );

  return (
    <svg
      className="handmadeReactChart-splines-cores-Spline"
      width={chartWidth}
      height={chartHeight}
    >
      <path d={path} />
    </svg>
  );
}
```

## Chart Context

In practice, a chart does not contains only one but many splines. A spline's location also depends on its sibling splines. Therefore, we need a context for sibling splines to share their points inputs.

```ts
export const ChartContext = createContext<{
  pointsInputs: PointsInput[];
  setPointsInputs: Dispatch<SetStateAction<PointsInput[]>>;
}>({
  //...
});
```

```ts
export interface PointsInput {
  type: "spline" | "area" | "axis" | "dots";
  points: Point[];
  maximum: Point;
  minimum: Point;
}

export interface Point {
  x: number;
  y: number;
}
```

Then, each `Spline` in `Chart` can register its data into the context, in [Spline.tsx](cores/Spline.tsx) and [usePointsInput.ts](cores/usePointsInput.ts).

```ts
useEffect(() => {
  if (memoInput) {
    setPointsInputs((oldInputs) => [...oldInputs, memoInput]);

    return () =>
      setPointsInputs((inputs) => inputs.filter((t) => t !== memoInput));
  }
}, [memoInput, setPointsInputs]);
```

This allows other splines to draw in correct position. In addition, axes can then be calculated from the registered data as well.

## Axis

In fact, axis is one of the important places for developer to show user the points of interest, on what a developer should brush up. Therefore, here we just leave the axis class open.

```tsx
<XAxis
  y={0}
  labels={[
    { x: 5, text: "V" },
    { x: 10, text: "X" },
    { x: 15, text: "XV" },
  ]}
/>
```

However, if you want a simple example code, checkout [SimpleXAxis](samples/SimpleXAxis.tsx) and[getSimpleAxisValues](samples/getSimpleAxisValues.ts).

```ts
const step = Math.pow(10, Math.ceil(Math.log10(Math.abs(maximum))) - 1);
```

For example, When maximum value is 100, the above guesses 10, 20, 30, etc.

## Simple Spline Chart

Learning the [above topics](#svg-path), you can now draw [SimpleSplineChart](samples/SimpleChart.tsx) with multiple [spline](#svg-path) and [xy axes](#axis).

## Point Labels

With the data in [ChartContext](#chart-context), not only the axes can be calculate, but also we can make use of the data to interact with user. For example, show label when user hovers onto a point.

In [PointLabel](samples/PointLabel.tsx), it is easily done with [useDraw](cores/useDraw.ts). You can add anything onto your points.

```ts
const draw = useDraw();
const { x: drawX, y: drawY } = draw({ x: inputX, y: inputY });

return (
  <div style={{ left: drawX, top: drawY }}>
    <div className="point" />

    <div className="label">{text}</div>
  </div>
);
```

## Advanced Spline Chart

With the [above knowledge](#svg-path), you can draw any [AdvancedSplineChart](samples/AdvancedChart.tsx) without difficulty.

In fact, a chart is just layers of [SVG](#svg-path) for splines, layers of DIV for axes and a bunch of DIV for labels stacking together.

```html
<div class="handmadeReactChart-splines-cores-Chart">
  <div class="handmadeReactChart-splines-cores-Grid">...</div>
  <div class="handmadeReactChart-splines-cores-XAxis">...</div>
  <div class="handmadeReactChart-splines-cores-YAxis">...</div>
  <svg class="handmadeReactChart-splines-cores-Area"><path d="..." /></svg>
  <svg class="handmadeReactChart-splines-cores-Area"><path d="..." /></svg>
  <svg class="handmadeReactChart-splines-cores-Spline"><path d="..." /></svg>
  <svg class="handmadeReactChart-splines-cores-Spline"><path d="..." /></svg>
  <div class="handmadeReactChart-splines-samples-PointLabel">...</div>
  <div class="handmadeReactChart-splines-samples-PointLabel">...</div>
  <div class="handmadeReactChart-splines-samples-PointLabel">...</div>
  <div class="handmadeReactChart-splines-samples-PointLabel">...</div>
  <div class="handmadeReactChart-splines-samples-PointLabel">...</div>
  <div class="handmadeReactChart-splines-samples-PointLabel">...</div>
</div>
```

## Custom Component

Write your own [chart code](#svg-path). Or copy the whole [splines](../splines) folder into your project. Or install **handmade-react-chart**. Any way can do.

If you follow the pattern here, just add any custom child component inside [Chart](cores/Chart.tsx) parent. And you will be able to use [ChartContext](cores/ChartContext.ts) and all functions like [useDraw](cores/useDraw.ts), [useRange](cores/useRange.ts), [usePointsInput](cores/usePointsInput.ts), [getSimpleAxisValues](samples/getSimpleAxisValues.ts).

```jsx
<Chart>
  <XAxis />
  <YAxis />

  <Spline />
  <Spline />

  <CustomComponent />
</Chart>
```

```tsx
export function CustomComponent() {
  const draw = useDraw();
  const { x, y } = draw(0, 1);

  return <div style={{ left: x, top: y, position: "absolute" }}>Custom</div>;
}
```

## CSS

Finally, if you want to brush up your chart, just override the [CSS](cores/DrawSlice.css) with your own rules.

```css
.handmadeReactChart-splines-cores-Spline {
  stroke-width: 3px;
  stroke: #eb44e8;
}

.handmadeReactChart-splines-cores-Area {
  fill: #eb44e844;
}
```
