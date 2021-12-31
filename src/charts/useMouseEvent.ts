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

      const innerEvents = Array.from(rects).map((rect) => ({
        x: outerEvent.clientX - rect.left,
        y: outerEvent.clientY - rect.top,
      }));

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
