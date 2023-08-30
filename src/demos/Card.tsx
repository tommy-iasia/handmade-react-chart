import { ReactNode, useState } from "react";
import "./Card.css";

export function Card({ next, children }: Props) {
  const [nexting, setNexting] = useState(false);

  return (
    <div
      className="handmadeReactChart-demos-Card"
      onPointerEnter={() => setNexting(true)}
      onPointerLeave={() => {
        if (nexting) {
          next?.(1);

          setNexting(false);
        }
      }}
      onPointerCancel={() => setNexting(false)}
    >
      {next && (
        <div
          className="left"
          onClick={() => {
            next?.(-1);
            setNexting(false);
          }}
        />
      )}

      {children}

      {next && (
        <div
          className="right"
          onClick={() => {
            next?.(1);
            setNexting(false);
          }}
        />
      )}
    </div>
  );
}

interface Props {
  next?: (index: number) => void;
  children: ReactNode;
}
