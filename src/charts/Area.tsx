import { ReactNode, useMemo, useRef } from "react";
import "./Area.css";
import { AreaContext } from "./AreaContext";
import { useMouseEvent } from "./useMouseEvent";

export function Area({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    call: callMouseMove,
    add: addMouseMove,
    remove: removeMouseMove,
  } = useMouseEvent(ref);

  const {
    call: callMouseEnter,
    add: addMouseEnter,
    remove: removeMouseEnter,
  } = useMouseEvent(ref);

  const {
    call: callMouseLeave,
    add: addMouseLeave,
    remove: removeMouseLeave,
  } = useMouseEvent(ref);

  const {
    call: callMouseClick,
    add: addMouseClick,
    remove: removeMouseClick,
  } = useMouseEvent(ref);

  const {
    call: callMouseDown,
    add: addMouseDown,
    remove: removeMouseDown,
  } = useMouseEvent(ref);

  const {
    call: callMouseUp,
    add: addMouseUp,
    remove: removeMouseUp,
  } = useMouseEvent(ref);

  return (
    <AreaContext.Provider
      value={useMemo(
        () => ({
          addMouseMove,
          removeMouseMove,
          addMouseEnter,
          removeMouseEnter,
          addMouseLeave,
          removeMouseLeave,
          addMouseClick,
          removeMouseClick,
          addMouseDown,
          removeMouseDown,
          addMouseUp,
          removeMouseUp,
        }),
        [
          addMouseMove,
          removeMouseMove,
          addMouseEnter,
          removeMouseEnter,
          addMouseLeave,
          removeMouseLeave,
          addMouseClick,
          removeMouseClick,
          addMouseDown,
          removeMouseDown,
          addMouseUp,
          removeMouseUp,
        ]
      )}
    >
      <div
        className={`handmadeReactChart-charts-Area ${className ?? ""}`}
        ref={ref}
        onMouseMove={callMouseMove}
        onMouseEnter={callMouseEnter}
        onMouseLeave={callMouseLeave}
        onClick={callMouseClick}
        onMouseDown={callMouseDown}
        onMouseUp={callMouseUp}
      >
        {children}
      </div>
    </AreaContext.Provider>
  );
}

interface Props {
  className?: string;
  children?: ReactNode;
}
