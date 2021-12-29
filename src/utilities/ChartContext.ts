import { createContext } from "react";
import { Listen } from "./useEventListener";
import { Event } from "./useMouseEvent";

export const ChartContext = createContext<{
  width: number;
  height: number;

  addMouseEnter: (listen: Listen<Event>) => void;
  removeMouseEnter: (listen: Listen<Event>) => void;

  addMouseLeave: (listen: Listen<Event>) => void;
  removeMouseLeave: (listen: Listen<Event>) => void;

  addMouseMove: (listen: Listen<Event>) => void;
  removeMouseMove: (listen: Listen<Event>) => void;

  addMouseClick: (listen: Listen<Event>) => void;
  removeMouseClick: (listen: Listen<Event>) => void;

  addMouseDown: (listen: Listen<Event>) => void;
  removeMouseDown: (listen: Listen<Event>) => void;

  addMouseUp: (listen: Listen<Event>) => void;
  removeMouseUp: (listen: Listen<Event>) => void;
}>({
  width: 0,
  height: 0,

  addMouseEnter: () => {},
  removeMouseEnter: () => {},

  addMouseLeave: () => {},
  removeMouseLeave: () => {},

  addMouseMove: () => {},
  removeMouseMove: () => {},

  addMouseClick: () => {},
  removeMouseClick: () => {},

  addMouseDown: () => {},
  removeMouseDown: () => {},

  addMouseUp: () => {},
  removeMouseUp: () => {},
});
