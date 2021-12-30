import { ReactNode, useMemo, useRef } from "react";
import "./MouseZone.css";
import { MouseZoneContext } from "./MouseZoneContext";
import { useMouseEvent } from "./useMouseEvent";

export function MouseZone({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

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
    <MouseZoneContext.Provider
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
      <span
        className="handmadeReactChart-utilities-MouseZone"
        ref={ref}
        onMouseMove={callMouseMove}
        onMouseEnter={callMouseEnter}
        onMouseLeave={callMouseLeave}
        onClick={callMouseClick}
        onMouseDown={callMouseDown}
        onMouseUp={callMouseUp}
      >
        {children}
      </span>
    </MouseZoneContext.Provider>
  );
}
