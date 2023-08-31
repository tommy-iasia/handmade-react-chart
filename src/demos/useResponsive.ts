import { useLayoutEffect, useState } from "react";

export function useResponsive() {
  const firstMatch = match();
  const [matched, setMatched] = useState(firstMatch);

  useLayoutEffect(() => {
    function updateMatched() {
      const nextMatched = match();
      setMatched(nextMatched);
    }

    updateMatched();

    window.addEventListener("resize", updateMatched);
    return () => window.removeEventListener("resize", updateMatched);
  }, []);

  return matched;
}

function match() {
  const matchMedia = window.matchMedia("(max-width: 900px)");
  return matchMedia.matches;
}
