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

  if (maximumXs.length <= 0) {
    return undefined;
  }

  const maximumX = Math.max(...maximumXs);

  const maximumYs = [
    coordinateInput.maximumY,
    coordinateInput.includeOriginY ? 0 : undefined,
    ...pointsInputs.map((input) => input.maximum.y),
  ].filter(isDefined);

  if (maximumYs.length <= 0) {
    return undefined;
  }

  const maximumY = Math.max(...maximumYs);

  const minimumXs = [
    coordinateInput.minimumX,
    coordinateInput.includeOriginX ? 0 : undefined,
    ...pointsInputs.map((input) => input.minimum.x),
  ].filter(isDefined);

  if (minimumXs.length <= 0) {
    return undefined;
  }

  const minimumX = Math.min(...minimumXs);

  const minimumYs = [
    coordinateInput.minimumY,
    coordinateInput.includeOriginY ? 0 : undefined,
    ...pointsInputs.map((input) => input.minimum.y),
  ].filter(isDefined);

  if (minimumYs.length <= 0) {
    return undefined;
  }

  const minimumY = Math.min(...minimumYs);

  return {
    maximum: { x: maximumX, y: maximumY },
    minimum: { x: minimumX, y: minimumY },
  };
}
