import { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";

export function Coordinate(props: Props) {
  const { setCoordinateInput } = useContext(ChartContext);

  const maximumX =
    "maximumX" in props
      ? props.maximumX
      : "maximum" in props
      ? props.maximum
      : undefined;

  const maximumY =
    "maximumY" in props
      ? props.maximumY
      : "maximum" in props
      ? props.maximum
      : undefined;

  const minimumX =
    "minimumX" in props
      ? props.minimumX
      : "minimum" in props
      ? props.minimum
      : undefined;

  const minimumY =
    "minimumY" in props
      ? props.minimumY
      : "minimum" in props
      ? props.minimum
      : undefined;

  const includeOriginX =
    "includeOriginX" in props
      ? props.includeOriginX ?? false
      : "includeOrigin" in props
      ? props.includeOrigin ?? false
      : false;

  const includeOriginY =
    "includeOriginY" in props
      ? props.includeOriginY ?? false
      : "includeOrigin" in props
      ? props.includeOrigin ?? false
      : false;

  useEffect(
    () =>
      setCoordinateInput({
        maximumX,
        maximumY,
        minimumX,
        minimumY,
        includeOriginX,
        includeOriginY,
      }),
    [
      includeOriginX,
      includeOriginY,
      maximumX,
      maximumY,
      minimumX,
      minimumY,
      setCoordinateInput,
    ]
  );

  return <></>;
}

interface Props {
  maximum?: number;
  maximumX?: number;
  maximumY?: number;

  minimum?: number;
  minimumX?: number;
  minimumY?: number;

  includeOrigin?: boolean;
  includeOriginX?: boolean;
  includeOriginY?: boolean;
}
