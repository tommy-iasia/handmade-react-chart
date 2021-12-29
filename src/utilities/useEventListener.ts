import { useMemo, useReducer } from "react";

export function useEventListener<T>() {
  const [listens, dispatch] = useReducer(
    (listens: Listen<T>[], action: Action<T>) => {
      switch (action.type) {
        case "add":
          return [...listens, action.listen];

        case "remove":
          return listens.filter((t) => t !== action.listen);
      }
    },
    []
  );

  const call = useMemo(
    () => (event: T) => {
      for (const listen of listens) {
        listen(event);
      }
    },
    [listens]
  );

  const add = useMemo(
    () => (listen: Listen<T>) => dispatch({ type: "add", listen }),
    []
  );

  const remove = useMemo(
    () => (listen: Listen<T>) => dispatch({ type: "remove", listen }),
    []
  );

  return {
    listens,
    call,
    add,
    remove,
  };
}

export type Listen<T> = (event: T) => void;

interface Action<T> {
  type: "add" | "remove";
  listen: Listen<T>;
}
