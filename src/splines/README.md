# Spline Chart

A spline chart is created by mapping data points and rendering them as a smooth spline.

## Coordinate

First, mapping is as simple as proportionally scaling the _x_ value to the chart's _width_, in [useDraw.ts](cores/useDraw.ts).

```ts
const drawX = (x: number) =>
  ((x - minimum.x) / (maximum.x - minimum.x)) * contentWidth;
```

## SVG Path

Once we map out every point, we can draw a `<path>` according to [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

```SVG
<path d="M x0 y0 L x1 x2 L x3 x4 ..."/>
```

To give a final touch, I would use `C` instead of `M`, and interpolate _x_ between points using a _smoothness_ parameter.

```svg
<path d="M x0 y0 C x0+ y0, x1- y1, x1 y1 C x1+ y1, x2- y2, x2 y2 ..."/>
```

```ts
const controlX =
  previousPoint.x + (currentPoint.x - previousPoint.x) * smoothness;
```

By inserting the interpolated control points, we can achieve a smooth and beautiful spline in [getSplinePath.ts](cores/getSplinePath.ts).

## Raw Spline

Combining the above [two ideas](#coordinate), you can now a draw [SVG](#svg-path) in [Spline.tsx](cores/Spline.tsx) and [RawSpline.tsx](samples/RawSpline.tsx). 💪🏼

```tsx
export function Spline({ points: dataPoints, smoothness }: Props) {
  const draw = useDraw();

  const path = useMemo(() => {
    const drawPoints = dataPoints.map((point) => draw(point));

    return getSplinePath(drawPoints, smoothness ?? 0.3);
  }, [dataPoints, draw, smoothness]);

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

In practice, a chart typically contains multiple splines. All splines collectively determine the maximum and minimum values, which in turn affect the drawn positions. Therefore, we need a [ChartContext](cores/ChartContext.ts) to share this information.

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

Splines, axes, and grids can then be drawn in harmony. 🎵

## Axis

An axis is fundamentally a series of labels placed along a line at key points of interest.

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

The optimal positions for labels can vary depending on the specific case. However, a common approach is to use decimal places. For example, when the range is 100, the labels might be 10, 20, 30... in [SimpleXAxis](samples/SimpleXAxis.tsx) and [getSimpleAxisValues](samples/getSimpleAxisValues.ts).

```ts
const step = Math.pow(
  10,
  Math.ceil(Math.log10(Math.max(Math.abs(maximum), Math.abs(minimum)))) - 1
);
```

## Simple Spline Chart

Learning the [above topics](#coordinate), you can now draw [SimpleSplineChart](samples/SimpleChart.tsx) with multiple [splines](#svg-path) and [xy axes](#axis).

## Point Labels

With [ChartContext](#chart-context), not only can the axes be calculated, but we can also use the data to interact with the user. For example, we can show a label when the user hovers over a point.

In [PointLabel](samples/PointLabel.tsx), this can be easily done with [useDraw](cores/useDraw.ts). With some imagination, you can add anything to your chart.

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

Stacking layers of [`<svg>`](#svg-path) and [`<div>`](#axis), we render an [AdvancedSplineChart](samples/AdvancedChart.tsx).

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

Write your own [chart code](#svg-path). Or copy the whole [splines](../splines) folder into your project. Or install **handmade-react-chart**. Any way can do. 🙆🏼‍♂️

In addition, you can insert any custom child component inside the [Chart](cores/Chart.tsx).

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

Utilize [ChartContext](cores/ChartContext.ts), [useDraw](cores/useDraw.ts), [useRange](cores/useRange.ts), [usePointsInput](cores/usePointsInput.ts), [getSimpleAxisValues](samples/getSimpleAxisValues.ts), etc, whatever you like.

## CSS

Finally, to brush up your chart, just override the [CSS](cores/Spline.css) with your own rules. 🎨

```css
.handmadeReactChart-splines-cores-Spline {
  stroke-width: 10px;
  stroke: #44eb98;
}

.handmadeReactChart-splines-cores-Area {
  fill: #44eb9844;
}
```

Happy chart programming! 😚
