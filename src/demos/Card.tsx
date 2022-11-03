import { ReactNode } from "react";
import "./Card.css";

export function Card({ children }: Props) {
  return <div className="handmadeReactChart-demos-Card">{children}</div>;
}

interface Props {
  children: ReactNode;
}
