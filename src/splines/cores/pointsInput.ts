import { Point } from "./point";

export interface PointsInput {
  type: "spline" | "area" | "axis" | "dots" | "prepare";
  points: Point[];
  maximum: Point;
  minimum: Point;
}
