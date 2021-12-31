import { useContext, useEffect } from "react";
import { AreaContext } from "../../charts/AreaContext";

export function MouseEnterSetter({ setEntered }: Props) {
  const { addMouseEnter, addMouseLeave } = useContext(AreaContext);

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
