import React, { ReactNode } from "react";
import "./Property.css";

export function Property({ name, value }: Props) {
  return (
    <span className="handmadeReactChart-presets-codes-Property">
      <span className="name">{name}</span>={"{"}
      <span className="value">{value}</span>
      {"}"}
    </span>
  );
}

interface Props {
  name: string;
  value: ReactNode;
}
