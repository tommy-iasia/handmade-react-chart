import { createContext } from "react";

export const SelectContext = createContext<{
  selectedIndex: number | undefined;
  setSelectedIndex: (index: number | undefined) => void;
}>({
  selectedIndex: undefined,
  setSelectedIndex: () => {},
});
