import { SourcePoint } from "./sourcePoint";

export interface PointsInput {
  type: "spline" | "area" | "axis" | "dots";
  points: SourcePoint[];
  maximum: { x: number; y: number };
  minimum: { x: number; y: number };
}
