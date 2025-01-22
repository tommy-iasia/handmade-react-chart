import { useMemo } from "react";
import { Grid } from "../cores/Grid";
import { useRange } from "../cores/useRange";
import { getSimpleAxisValues } from "./getSimpleAxisValues";

export function SimpleGrid({ className, xCapacity, yCapacity }: Props) {
  const range = useRange();

  const xs = useMemo(
    () => getSimpleAxisValues(range.minimum.x, range.maximum.x, xCapacity),
    [range, xCapacity]
  );

  const ys = useMemo(
    () => getSimpleAxisValues(range.minimum.y, range.maximum.y, yCapacity),
    [range, yCapacity]
  );

  return <Grid className={className} xs={xs} ys={ys} />;
}

interface Props {
  className?: string;
  xCapacity: number;
  yCapacity: number;
}
