import { useEffect } from "react";
import { DonutItem } from "../DonutItem";
import { useMouseMoveSelect } from "./useMouseMoveSelect";

export function MouseMoveSelector({ setSelectedItem }: Props) {
  const selected = useMouseMoveSelect();

  useEffect(() => setSelectedItem(selected), [selected]);

  return <></>;
}

interface Props {
  setSelectedItem(item: DonutItem | undefined): void;
}
