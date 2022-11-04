# Donut Chart

Here we use SVG `<path/>` to draw the chart.

## SVG Path

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths), we use can use `A` to draw for arc. We may take a look of [DrawSlice.tsx](cores/DrawSlice.tsx).

```tsx
const outerFromX = centerX + outerRadius * Math.cos(fromAngle);
const outerFromY = centerY + outerRadius * Math.sin(fromAngle);

const outerToX = centerX + outerRadius * Math.cos(toAngle);
const outerToY = centerY + outerRadius * Math.sin(toAngle);

const innerFromX = centerX + innerRadius * Math.cos(fromAngle);
const innerFromY = centerY + innerRadius * Math.sin(fromAngle);

const innerToX = centerX + innerRadius * Math.cos(toAngle);
const innerToY = centerY + innerRadius * Math.sin(toAngle);

const largeArcFlag = toAngle - fromAngle >= Math.PI ? 1 : 0;

return (
  <svg
    className="handmadeReactChart-donuts-cores-DrawSlice"
    width={chartWidth}
    height={chartHeight}
  >
    <path
      d={`M ${outerFromX} ${outerFromY}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerToX} ${outerToY}
        L ${innerToX} ${innerToY}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerFromX} ${innerFromY}
        Z`}
    />
  </svg>
);
```

1. Drawing a slice from `fromAngle` to `toAngle`, the first point is at `fromAngle` with `outerRadius`.
2. Then draw the outer arc of `outerRadius` until the second point at `toAngle` with `outerRadius`.
3. Draw a line to third point at `toAngle` with `innerRadius`
4. Then draw the inner arc of `innerRadius` until the forth point at `fromAngle` to `toAngle`
5. Finally close the path. Then we will have the slice enclosed by the outer and inner arcs.

## Chart Context

The [above section](#svg-path) draws one slice. However, a chart consists of multiple slices. Therefore, we need a context for sibling slices to share their value inputs.

```ts
export const ChartContext = createContext<{
  valueInputs: ValueInput[];
  setValueInputs: Dispatch<SetStateAction<ValueInput[]>>;
}>({
  //...
});
```

```ts
export interface ValueInput {
  index: number;
  value: number;
}
```

In [ValueSlice](cores/ValueSlice.tsx), each `ValueSlice` in `Chart` register its data into the context, for their sibling slices.

```ts
useEffect(() => {
  const input = { index, value };
  setValueInputs((inputs) => [...inputs, input]);

  return () => setValueInputs((inputs) => inputs.filter((t) => t !== input));
}, [index, setValueInputs, value]);
```

So that, for example, a slice can calculate out its angle in [useAngle.ts](cores/useAngle.ts).

```ts
const { valueInputs } = useContext(ChartContext);

const currentInput = valueInputs.find((input) => input.index === index);

const totalValue = valueInputs
  .map((input) => input.value)
  .reduce((s, t) => s + t, 0);

const beforeValue = valueInputs
  .filter((input) => input.index < index)
  .map((input) => input.value)
  .reduce((s, t) => s + t, 0);

return {
  from: (2 * Math.PI * beforeValue) / totalValue,
  to: (2 * Math.PI * (beforeValue + currentInput.value)) / totalValue,
};
```

## Raw Donut

Learning the above [two things](#svg-path), you can now draw donut chart in [SVG](#svg-path) like [RawDonut.tsx](samples/RawDonut.tsx).

## Select Slice

We now know that a slice is defined by its from angle and to angle. With the help of all `valueInputs` in [ChartContext](#chart-context), it is possible to select an slice by (x, y) in [Selector.tsx](samples/Selector.tsx).

```ts
const listener = (event: PointerEvent) => {
  const x = event.offsetX - centerX;
  const y = event.offsetY - centerY;

  const angle = Math.atan2(y, x);

  //...

  setSelectedIndex(index);
};
```

Then adjust the `outerRadius`, you can let user select slice by mouse and finger, like in [SimpleChart.tsx](samples/SimpleChart.tsx).

```ts
<AnimatedSlice
  index={i}
  value={value}
  outerRadius={i === selectedIndex ? radius : radius * 0.9}
/>
```

## Simple Donut Chart

Learning the above technique, drawing a [SimpleDonutChart](samples/SimpleChart.tsx) should be a piece of cake.

## Animations

If it is easy to make, why not add animation when chart values change? Take a look of [AnimatedSlice.tsx](samples/AnimatedSlice.tsx) and [useAnimatedValue.ts](samples/useAnimatedValue.ts).

```ts
const outputOuterRadius = useAnimatedValue(propsOuterRadius, transition / 2);
const fromAngle = useAnimatedValue(angle.from, transition / 2);
const toAngle = useAnimatedValue(angle.to, transition / 2);
```

## Slice Labels

Finally, let's label the slices. And the work is so easy too, in [SliceLabel](samples/SliceLabel.tsx).

```tsx
const angle = useAngle(index);
if (!angle) {
  return <></>;
}

const pointAngle = (angle.from + angle.to) / 2;

const pointX = Math.cos(pointAngle) * pointRadius;
const pointY = Math.sin(pointAngle) * pointRadius;

return (
  <div
    className="handmadeReactChart-donuts-samples-SliceLabel"
    style={{ left: pointX, top: pointY }}
  >
    <div className="point">
      <div
        className="line"
        style={{
          width: lineLength,
          transform: `rotate(${pointAngle + Math.PI}rad)`,
        }}
      ></div>
    </div>

    <div className="text">{text}</div>
  </div>
);
```

## Advanced Donut Chart

With the [above knowledge](#svg-path), you can draw any [AdvancedDonutChart](samples/AdvancedChart.tsx) without difficulty.

In fact, a chart is just layers of [SVG](#svg-path) for slices and a bunch of DIV for labels stacking together.

```html
<div class="handmadeReactChart-donuts-cores-Chart chart">
  <svg class="handmadeReactChart-donuts-cores-DrawSlice"><path d="..." /></svg>
  <svg class="handmadeReactChart-donuts-cores-DrawSlice"><path d="..." /></svg>
  <svg class="handmadeReactChart-donuts-cores-DrawSlice"><path d="..." /></svg>
  <div class="handmadeReactChart-donuts-samples-SliceLabel"></div>
  <div class="handmadeReactChart-donuts-samples-SliceLabel"></div>
  <div class="handmadeReactChart-donuts-samples-SliceLabel"></div>
</div>
```

## CSS

Finally, if you want to brush up your donut, just override the [CSS](cores/DrawSlice.css) with your own rules.

```css
.handmadeReactChart-donuts-cores-DrawSlice:nth-of-type(6n + 1) {
  fill: #eb44e8;
}
```
