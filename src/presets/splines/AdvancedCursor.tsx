import React, { ReactNode, useContext, useState } from "react";
import {
  MouseMoveSelector,
  Selected,
} from "../../splines/mouses/MouseMoveSelector";
import { SplineChartContext } from "../../splines/SplineChartContext";
import { SplineLineItem } from "../../splines/SplineLineItem";
import "./AdvancedCursor.css";

export function AdvancedCursor({ className, distance, getContent }: Props) {
  const [selected, setSelected] = useState<Selected>();

  const { contentLeft, contentTop, contentWidth, contentHeight } = useContext(
    SplineChartContext
  );

  return (
    <>
      <MouseMoveSelector distance={distance} setSelected={setSelected} />

      {selected &&
        (() => {
          const content = getContent(
            selected.item,
            selected.point,
            selected.position
          );

          return (
            content && (
              <div
                className={`handmadeReactChart-presets-splines-AdvancedCursor ${
                  className ?? ""
                }`}
                style={{
                  left: selected?.position.x,
                  top: selected?.position.y,
                }}
              >
                <div className={`content ${getPositionClass()}`}>{content}</div>
              </div>
            )
          );
        })()}
    </>
  );

  function getPositionClass() {
    if (!selected) {
      return "";
    }

    const xRatio = (selected.position.x - contentLeft) / contentWidth;
    const horizontalClass =
      xRatio <= 0.35 ? "left" : xRatio >= 0.65 ? "right" : "horizontal-center";

    const yRatio = (selected.position.y - contentTop) / contentHeight;
    const verticalClass =
      yRatio <= 0.35 ? "top" : yRatio >= 0.65 ? "bottom" : "vertical-center";

    if (
      horizontalClass === "horizontal-center" &&
      verticalClass === "vertical-center"
    ) {
      return "both-center";
    } else {
      return `${horizontalClass} ${verticalClass}`;
    }
  }
}

interface Props {
  className?: string;
  distance: number;

  getContent(
    item: SplineLineItem,
    point: { x: number; y: number },
    position: { x: number; y: number }
  ): ReactNode | undefined;
}
