import { createContext, Dispatch, SetStateAction } from "react";

export const SelectContext = createContext<{
  selectedIndex: number | undefined;
  setSelectedIndex: Dispatch<SetStateAction<number | undefined>>;
}>({
  selectedIndex: undefined,
  setSelectedIndex: () => {},
});
