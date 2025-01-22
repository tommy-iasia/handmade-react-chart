import { isDefined } from "../../utilities/isDefined";
import { CoordinateInput } from "./coordinateInput";
import { PointsInput } from "./pointsInput";

export function findRange(
  coordinateInput: CoordinateInput,
  pointsInputs: PointsInput[]
) {
  const maximumXs = [
    coordinateInput.maximumX,
    coordinateInput.includeOriginX ? 0 : undefined,
    ...pointsInputs.map((input) => input.maximum.x),
  ].filter(isDefined);

  const maximumX = maximumXs.length > 0 ? Math.max(...maximumXs) : undefined;

  const maximumYs = [
    coordinateInput.maximumY,
    coordinateInput.includeOriginY ? 0 : undefined,
    ...pointsInputs.map((input) => input.maximum.y),
  ].filter(isDefined);

  const maximumY = maximumYs.length > 0 ? Math.max(...maximumYs) : undefined;

  const minimumXs = [
    coordinateInput.minimumX,
    coordinateInput.includeOriginX ? 0 : undefined,
    ...pointsInputs.map((input) => input.minimum.x),
  ].filter(isDefined);

  const minimumX = minimumXs.length > 0 ? Math.min(...minimumXs) : undefined;

  const minimumYs = [
    coordinateInput.minimumY,
    coordinateInput.includeOriginY ? 0 : undefined,
    ...pointsInputs.map((input) => input.minimum.y),
  ].filter(isDefined);

  const minimumY = minimumYs.length > 0 ? Math.min(...minimumYs) : undefined;

  return {
    maximum: {
      x:
        maximumX !== undefined
          ? maximumX
          : minimumX !== undefined
          ? minimumX
          : 0,
      y:
        maximumY !== undefined
          ? maximumY
          : minimumY !== undefined
          ? minimumY
          : 0,
    },
    minimum: {
      x:
        minimumX !== undefined
          ? minimumX
          : maximumX !== undefined
          ? maximumX
          : 0,
      y:
        minimumY !== undefined
          ? minimumY
          : maximumY !== undefined
          ? maximumY
          : 0,
    },
  };
}
