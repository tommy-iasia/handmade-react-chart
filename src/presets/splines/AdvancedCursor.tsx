import { ReactNode, useContext, useState } from "react";
import {
  Match,
  MouseMoveSelector,
} from "../../splines/mouses/MouseMoveSelector";
import { SplineChartContext } from "../../splines/SplineChartContext";
import { SplineLineItem } from "../../splines/SplineLineItem";
import "./AdvancedCursor.css";

export function AdvancedCursor({ className, distance, getContent }: Props) {
  const [match, setMatch] = useState<Match>();

  const { contentLeft, contentTop, contentWidth, contentHeight } =
    useContext(SplineChartContext);

  return (
    <div
      className={`handmadeReactChart-presets-splines-AdvancedCursor ${className}`}
      style={{ left: match?.position.x, top: match?.position.y }}
    >
      <MouseMoveSelector distance={distance} setMatch={setMatch} />

      {match && (
        <div className={`content ${getPositionClass()}`}>
          {getContent(match.item, match.point, match.position)}
        </div>
      )}
    </div>
  );

  function getPositionClass() {
    if (!match) {
      return "";
    }

    const xRatio = (match.position.x - contentLeft) / contentWidth;
    const horizontalClass =
      xRatio <= 0.35 ? "left" : xRatio >= 0.65 ? "right" : "horizontal-center";

    const yRatio = (match.position.y - contentTop) / contentHeight;
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
