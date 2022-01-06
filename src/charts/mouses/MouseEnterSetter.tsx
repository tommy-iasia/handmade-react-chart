import { useContext, useEffect } from "react";
import { ChartContext } from "../ChartContext";

export function MouseEnterSetter({ setEntered }: Props) {
  const { addMouseEnter, addMouseLeave } = useContext(ChartContext);

  useEffect(
    () => addMouseEnter(() => setEntered(true)),
    [addMouseEnter, setEntered]
  );

  useEffect(
    () => addMouseLeave(() => setEntered(false)),
    [addMouseLeave, setEntered]
  );

  return <></>;
}

interface Props {
  setEntered(entered: boolean): void;
}
