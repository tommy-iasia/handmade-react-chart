import { ReactNode } from "react";
import "./Center.css";

export function Center({ className, children }: Props) {
  return (
    <div
      className={`handmadeReactChart-donuts-centers-Center ${className ?? ""}`}
      onMouseMove={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
}

interface Props {
  className?: string;
  children?: ReactNode;
}
