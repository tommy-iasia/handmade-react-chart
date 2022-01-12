import React, { useContext, useEffect } from "react";
import { ChartContext } from "../../charts/ChartContext";
import { Event } from "../../charts/mouses/useMouseEvent";
import { usePositioning } from "../axes/usePositioning";
import { SplineChartContext } from "../SplineChartContext";
import { SplineLineItem } from "../SplineLineItem";

export function MouseMoveSelector({ distance, setSelected }: Props) {
  const { addMouseMove } = useContext(ChartContext);

  const { lineItems } = useContext(SplineChartContext);

  const positioning = usePositioning();

  useEffect(
    () =>
      addMouseMove((event: Event) => {
        const matches = lineItems.flatMap((item) =>
          item.points.map((point) => {
            const position = positioning(point.x, point.y);

            const dX = position.x - event.x;
            const dY = position.y - event.y;

            return {
              distanceSquare: dX * dX + dY * dY,
              item,
              point,
              position,
            };
          })
        );

        const validDistanceSquare = distance * distance;

        const sortedMatches = matches
          .filter((match) => match.distanceSquare <= validDistanceSquare)
          .sort((a, b) => a.distanceSquare - b.distanceSquare);

        if (sortedMatches.length <= 0) {
          setSelected(undefined);
          return;
        }

        const bestMatch = sortedMatches[0];
        setSelected(bestMatch);
      }),
    [addMouseMove, distance, lineItems, positioning, setSelected]
  );

  return <></>;
}

interface Props {
  distance: number;
  setSelected(selected: Selected | undefined): void;
}

export interface Selected {
  item: SplineLineItem;
  point: { x: number; y: number };
  position: { x: number; y: number };
}
