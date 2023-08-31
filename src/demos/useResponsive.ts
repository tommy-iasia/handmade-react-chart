import { useLayoutEffect, useState } from "react";

const maxWidth = 800;

export function useResponsive() {
  const firstMatch = match(maxWidth);
  const [matched, setMatched] = useState(firstMatch);

  useLayoutEffect(() => {
    function updateMatched() {
      const nextMatched = match(maxWidth);
      setMatched(nextMatched);
    }

    updateMatched();

    window.addEventListener("resize", updateMatched);
    return () => window.removeEventListener("resize", updateMatched);
  }, []);

  return matched;
}

function match(maxWidth: number) {
  const matchMedia = window.matchMedia(`(max-width: ${maxWidth}px)`);
  return matchMedia.matches;
}
