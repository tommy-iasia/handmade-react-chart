import React, { ReactNode } from "react";
import "./Row.css";

export function Row({
  className,
  chart,
  code,
  content,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <div
      className={`handmadeReactChart-presets-Row ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="chart">{chart}</div>

      <div className="body">
        <div className="code">{code}</div>

        <div className="content">{content}</div>
      </div>
    </div>
  );
}

interface Props {
  className?: string;
  chart: ReactNode;
  code: ReactNode;
  content: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
