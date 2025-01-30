# Donut Chart

Creating slices 🍰 using SVG `<path/>` elements is quite straightforward.

## SVG Path

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths), path `A` are for drawing arc. 🌈  
Take a look of [DrawSlice.tsx](cores/DrawSlice.tsx). It is just **two arcs** and **two straight lines**.

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

1. Draw the outer arc from `outerFrom` to `outerTo` with `outerRadius`.
2. Draw a line to `innerTo`.
3. Draw the inner arc from `innerTo` to `innerFrom` with `innerRadius`.
4. Close the path.

## Chart Context

The [above section](#svg-path) draws one slice. In practice, a chart consists of multiple slices. Therefore, we need a [ChartContext](cores/ChartContext.ts) for sibling slices to share their values.

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

Thus, in [useAngle.ts](cores/useAngle.ts), a slice can calculate its angle relative to the entire chart.

```ts
const { valueInputs } = useContext(ChartContext);

const currentInput = valueInputs.find((input) => input.index === index);

const beforeValue = valueInputs
  .filter((input) => input.index < index)
  .map((input) => input.value)
  .reduce((s, t) => s + t, 0);

const totalValue = valueInputs
  .map((input) => input.value)
  .reduce((s, t) => s + t, 0);

return {
  from: (2 * Math.PI * beforeValue) / totalValue,
  to: (2 * Math.PI * (beforeValue + currentInput.value)) / totalValue,
};
```

## Raw Donut

Learning the above [two concepts](#svg-path), we can now draw [RawDonut.tsx](samples/RawDonut.tsx).

## User Interaction

We now understand that a slice is defined by its starting and ending angles. It is possible to select a slice by converting the mouse position into an angle, as demonstrated in [Selector.tsx](samples/Selector.tsx).

```ts
const listener = (event: PointerEvent) => {
  const x = event.offsetX - centerX;
  const y = event.offsetY - centerY;

  const angle = Math.atan2(y, x);

  //...

  setSelectedIndex(index);
};
```

Then adjust the `outerRadius`, you can animate slices, like in [SimpleChart.tsx](samples/SimpleChart.tsx).

```tsx
<AnimatedSlice
  index={i}
  value={value}
  outerRadius={i === selectedIndex ? radius : radius * 0.9}
/>
```

## Simple Donut Chart

Learning the [above technique](#svg-path), drawing a [SimpleDonutChart](samples/SimpleChart.tsx) should be a piece of cake.

## Slice Labels

Finally, let's label the slices, in [SliceLabel.ts](samples/SliceLabel.tsx).

```tsx
const angle = useAngle(index);
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

Stacking layers of [SVG](#svg-path) and DIV elements, you can create any [Donut Chart](samples/AdvancedChart.tsx) you desire.

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

Finally, to customize your donut's appearance, override the default styles in [DrawSlice.css](cores/DrawSlice.css) with your own CSS rules. 🎨

```css
.handmadeReactChart-donuts-cores-DrawSlice:nth-of-type(6n + 1) {
  fill: #44eb98;
}
```

Happy chart programming! 😚
