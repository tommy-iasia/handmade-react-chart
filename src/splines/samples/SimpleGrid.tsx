import { useMemo } from "react";
import { Grid } from "../cores/Grid";
import { useRange } from "../cores/useRange";
import { getSimpleAxisValues } from "./getSimpleAxisValues";

export function SimpleGrid({ xCapacity, yCapacity }: Props) {
  const range = useRange();

  const xs = useMemo(() => {
    if (!range) {
      return [];
    }

    return getSimpleAxisValues(range.minimum.x, range.maximum.x, xCapacity);
  }, [range, xCapacity]);

  const ys = useMemo(() => {
    if (!range) {
      return [];
    }

    return getSimpleAxisValues(range.minimum.y, range.maximum.y, yCapacity);
  }, [range, yCapacity]);

  return <Grid xs={xs} ys={ys} />;
}

interface Props {
  xCapacity: number;
  yCapacity: number;
}
