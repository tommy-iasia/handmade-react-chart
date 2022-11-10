export function getSimpleAxisValues(
  minimum: number,
  maximum: number,
  capacity: number
) {
  const step = Math.pow(
    10,
    Math.ceil(Math.log10(Math.max(Math.abs(maximum), Math.abs(minimum)))) - 1
  );

  for (const factor of [0.5, 1, 2, 3, 5]) {
    const count = 1 + Math.floor(10 / factor) * 2;

    const values = new Array(count)
      .fill(1)
      .map((_, i) => i - (count - 1) / 2)
      .map((t) => t * step * factor)
      .filter((t) => t <= maximum)
      .filter((t) => t >= minimum);

    if (values.length <= capacity) {
      return values;
    }
  }

  return capacity >= 2 ? [minimum, maximum] : capacity >= 1 ? [maximum] : [];
}
