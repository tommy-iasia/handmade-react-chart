import { useContext, useEffect } from "react";
import { MouseZoneContext } from "../../charts/mouses/MouseZoneContext";
import { DonutItem } from "../DonutItem";

export function MouseLeaveDeselector({ setSelectedItem }: Props) {
  const { addMouseLeave } = useContext(MouseZoneContext);

  useEffect(
    () =>
      addMouseLeave(() => {
        setSelectedItem(undefined);
      }),
    [addMouseLeave]
  );

  return <></>;
}

interface Props {
  setSelectedItem(item: DonutItem | undefined): void;
}
