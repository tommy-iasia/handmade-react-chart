import { ReactNode, useMemo, useRef } from "react";
import { ChartContext } from "./ChartContext";
import { useMouseEvent } from "./useMouseEvent";

export default function Chart({ width, height, children }: Props) {
  const ref = useRef<SVGSVGElement>(null);

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
    <ChartContext.Provider
      value={useMemo(
        () => ({
          width,
          height,
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
          width,
          height,
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
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        ref={ref}
        onMouseMove={callMouseMove}
        onMouseEnter={callMouseEnter}
        onMouseLeave={callMouseLeave}
        onClick={callMouseClick}
        onMouseDown={callMouseDown}
        onMouseUp={callMouseUp}
      >
        {children}
      </svg>
    </ChartContext.Provider>
  );
}

interface Props {
  width: number;
  height: number;
  children?: ReactNode;
}
