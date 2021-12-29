import { RefObject, useCallback } from "react";
import { useEventListener } from "./useEventListener";

export function useMouseEvent<T extends Element>(ref: RefObject<T>) {
  const { listens, call: innerCall, add, remove } = useEventListener<Event>();

  const outerCall = useCallback(
    (outerEvent: { clientX: number; clientY: number }) => {
      if (!ref.current) {
        return;
      }

      const rects = ref.current.getClientRects();

      const innerEvents = Array.from(rects)
        .map((rect) => {
          const x = outerEvent.clientX - rect.left;
          if (x < 0 || x >= rect.width) {
            return { valid: false, x: 0, y: 0 };
          }

          const y = outerEvent.clientY - rect.top;
          if (y < 0 || y >= rect.height) {
            return { valid: false, x: 0, y: 0 };
          }

          return { valid: true, x, y };
        })
        .filter((t) => t.valid);

      for (const innerEvent of innerEvents) {
        innerCall(innerEvent);
      }
    },
    [innerCall, ref]
  );

  return {
    listens,
    call: outerCall,
    add,
    remove,
  };
}

export interface Event {
  x: number;
  y: number;
}
